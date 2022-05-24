import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    album: [{}],
    isLoading: true,
  }

  componentDidMount() {
    const { match: { params: { id } }, onFavoriteChange } = this.props;
    getMusics(id).then((response) => (
      this.setState({ album: response, isLoading: false })
    ));

    this.setState({ isLoading: true }, () => {
      getFavoriteSongs().then((response) => {
        this.setState({ isLoading: false }, () => { onFavoriteChange(response); });
      });
    });
  }

  checkFavorites = (track) => {
    const { favoriteSongs } = this.props;
    return favoriteSongs.some((song) => song.trackId === track.trackId);
  }

  render() {
    const { album: [{ artworkUrl100, artistName, collectionName },
      ...trackList], isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {!isLoading ? (
          <div className="musics-page-content">
            <div className="album-title-container">
              <div className="album-title-content">
                <img
                  src={ artworkUrl100 }
                  alt={ collectionName }
                />
                <h3>
                  <p data-testid="artist-name">{artistName}</p>
                  <p data-testid="album-name">{collectionName}</p>
                </h3>
              </div>
            </div>
            <div className="music-list">
              {trackList.map((track) => (
                <div key={ track.trackId } className="music-card-content">
                  <MusicCard
                    music={ track }
                    isFavorite={ this.checkFavorites(track) }
                  />
                </div>
              ))}
            </div>
          </div>
        ) : <Loading TagName="h1" />}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
  onFavoriteChange: propTypes.func.isRequired,
  favoriteSongs: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Album;
