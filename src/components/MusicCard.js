import propTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
  }

  componentDidMount() {
    const { music } = this.props;
    this.setState({ isChecked: this.checkFavorites(music.trackId) });
  }

  addToFavorites = async () => {
    const { music, onFavoriteChange, setIsLoading } = this.props;
    this.setState({ isChecked: true });
    setIsLoading(true);
    addSong(music).then(async () => {
      await onFavoriteChange();
      setIsLoading(false);
    });
  }

  removeFromFavorites = async () => {
    const { music, onFavoriteChange, setIsLoading } = this.props;
    this.setState({ isChecked: false });
    setIsLoading(true);
    removeSong(music).then(async () => {
      await onFavoriteChange();
      setIsLoading(false);
    });
  }

  handleFavorite = async (e) => {
    if (e.target.checked === false) {
      await this.removeFromFavorites();
    } else {
      await this.addToFavorites();
    }
  }

  checkFavorites = () => {
    const { music, favoriteSongs } = this.props;
    return favoriteSongs.some((favoriteSong) => favoriteSong.trackId === music.trackId);
  }

  render() {
    const { isChecked } = this.state;
    const { music: { trackId, trackName, previewUrl } } = this.props;
    return (
      <div className="music-card">
        <div className="track-name">
          <p>{trackName}</p>
        </div>
        <div className="player-and-checker">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            {'O seu navegador não suporta o elemento '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ `favorite-${trackId}` }>
            <input
              data-testid={ `checkbox-music-${trackId}` }
              id={ `favorite-${trackId}` }
              type="checkbox"
              checked={ isChecked }
              onChange={ (e) => this.handleFavorite(e) }
            />
            Favorita
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.shape({
    trackId: propTypes.oneOfType([propTypes.number, propTypes.string]),
    trackName: propTypes.string,
    previewUrl: propTypes.string,
  }).isRequired,
  favoriteSongs: propTypes.arrayOf(propTypes.object).isRequired,
  onFavoriteChange: propTypes.func.isRequired,
  setIsLoading: propTypes.func.isRequired,
};

export default MusicCard;
