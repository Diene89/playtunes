import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';
import '../style/MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
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
      });
    } else {
      this.setState({
        loading: true,
      });
      await removeSong(track);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { track } = this.props;
    const { trackId, trackName, previewUrl, artworkUrl100, collectionName } = track;
    const { loading } = this.state;
    return (
      <div className="song row">
        <img src={ artworkUrl100 } alt={ collectionName } />
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
            checked={ localStorage.getItem('favorite_songs').includes(trackId) }
            onChange={ () => this.handleCheckFavorite(track) }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
