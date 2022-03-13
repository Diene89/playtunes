import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class MusicCard extends Component {
  constructor() {
    super();

  }

  handleCheckFavorite

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
