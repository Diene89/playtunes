import propTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/CardAlbum.css';

class CardAlbum extends Component {
  render() {
    const { collectionId, artworkUrl100, artistName, collectionName } = this.props;
    return (
      <div className="cardAlbum col">
        <img src={ artworkUrl100 } alt={ collectionName } />

        <h2>{collectionName}</h2>
        <p className="artistName">{artistName}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Ver album
        </Link>

      </div>
    );
  }
}

CardAlbum.propTypes = {
  collectionId: propTypes.string.isRequired,
  artworkUrl100: propTypes.string.isRequired,
  artistName: propTypes.string.isRequired,
  collectionName: propTypes.string.isRequired,
};

export default CardAlbum;
