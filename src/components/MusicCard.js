import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music: { trackName, previewUrl } } = this.props;
    return (
      <div className="music-card">
        <div className="track-name">
          <p>{trackName}</p>
        </div>
        <div className="player-and-checker">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.shape({
    trackName: propTypes.string,
    previewUrl: propTypes.string,
  }).isRequired,
};

export default MusicCard;
