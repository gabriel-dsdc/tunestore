import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    album: [{}],
    favoriteSongs: [{}],
    isLoading: true,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: true }, async () => {
      await this.handleFavorite();
      const musicsList = await getMusics(id);
      this.setState({ album: musicsList, isLoading: false });
    });
  }

  handleFavorite = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  }

  setIsLoading = (bool) => {
    this.setState({ isLoading: bool });
  }

  render() {
    const { album: [{ artworkUrl100, artistName, collectionName },
      ...trackList], favoriteSongs, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header currentLink="search" />
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
                    favoriteSongs={ favoriteSongs }
                    onFavoriteChange={ this.handleFavorite }
                    setIsLoading={ this.setIsLoading }
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
};

export default Album;
