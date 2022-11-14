import propTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    isChecked: false,
  }

  componentDidMount() {
    const { music, isFavorite } = this.props;
    this.setState({ isChecked: isFavorite(music.trackId) });
  }

  addToFavorites = async () => {
    const { music, onFavoriteChange } = this.props;
    this.setState({ isLoading: true }, () => {
      addSong(music).then(async () => {
        await onFavoriteChange();
        this.setState({ isLoading: false, isChecked: true });
      });
    });
  }

  removeFromFavorites = async () => {
    const { music, onFavoriteChange } = this.props;
    this.setState({ isLoading: true }, () => {
      removeSong(music).then(async () => {
        await onFavoriteChange();
        this.setState({ isLoading: false, isChecked: false });
      });
    });
  }

  handleFavorite = async (e) => {
    if (e.target.checked === false) {
      await this.removeFromFavorites();
    } else {
      await this.addToFavorites();
    }
  }

  render() {
    const { isLoading, isChecked } = this.state;
    const { music: { trackId, trackName, previewUrl } } = this.props;
    return (
      <div className="music-card">
        { !isLoading ? (
          <>
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
              <label htmlFor={ `favorite=${trackId}` }>
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
          </>) : <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.shape({
    trackId: propTypes.number,
    trackName: propTypes.string,
    previewUrl: propTypes.string,
  }).isRequired,
  isFavorite: propTypes.func.isRequired,
  onFavoriteChange: propTypes.func.isRequired,
};

export default MusicCard;
