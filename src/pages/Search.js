import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Loading } from './Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isButtonDisabled: true,
      loading: false,
      albumsList: [],
      artistSearch: false,
      search: '',
    };
  }

  handleChange = ({ target }) => {
    const minCharacters = 2;
    this.setState({
      isButtonDisabled: target.value.length < minCharacters,
      artistName: target.value,
    });
  }

  getAlbum = async () => {
    const { artistName } = this.state;
    this.setState({ loading: true },
      async () => {
        const albumsList = await searchAlbumsAPIs(artistName);
        // albums.then(e=>console.log(e))
        this.setState({
          loading: false,
          albumsList,
          search: artistName,
          artistName: '',
          artistSearch: true,
        });
      });
  }

  render() {
    const { isButtonDisabled, artistName,
      loading, albumsList, artistSearch, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading
          ? <Loading />
          : (
            <form>
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.handleChange }
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.getAlbum }
              >
                Pesquisar
              </button>
            </form>
          )}
        {artistSearch && (
          <p>
            Resultado de álbuns de:
            {' '}
            {search}
          </p>
        )}
        {!albumsList.length
          ? <h3>Nenhum álbum foi encontrado</h3>
          : (
            <div className="cards">
              {albumsList.map((album) => (
                <div key={ album.collectionId } className="cardAlbum">
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <h2 className="title">{album.collectionName}</h2>
                  <p className="artistName">{artistName}</p>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    Ver album
                  </Link>
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
