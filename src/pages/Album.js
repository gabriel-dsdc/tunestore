import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    album: [{}],
    isLoading: true,
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((response) => (
      this.setState({ album: response, isLoading: false })
    ));
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
                  <MusicCard music={ track } />
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
