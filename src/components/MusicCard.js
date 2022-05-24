import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    isChecked: false,
  }

  addToFavorites = () => {
    const { music } = this.props;
    this.setState({ isLoading: true }, () => {
      addSong(music).then(() => {
        this.setState({ isLoading: false, isChecked: true });
      });
    });
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
                  onChange={ this.addToFavorites }
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
};

export default MusicCard;
