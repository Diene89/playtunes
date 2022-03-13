import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };

  }

  componentDidMount() {
    getFavoriteSongs();
  }

  handleCheckFavorite = async (track) => {
    if (!localStorage.getItem('favorite_songs').includes(track.trackId)) {
      this.setState({
        loading: true,
      });
      await addSong(track);
      this.setState({
        loading: false,
      })
    } else {
      this.setState({
        loading: true,
      });
      await removeSong(track);
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { track } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        <h3>{track.trackName}</h3>
        <audio data-testid="audio-component" src={ track.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${track.trackId}` }
            checked={ localStorage.getItem('favorite_songs').includes(track.trackId) }
            onChange={ () => { this.handleCheckFavorite(track) } }
          />
        </label>
        {loading && <Loading />}
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
