import React, { Component } from 'react';
import Header from '../components/Header';
import { Loading } from './Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import CardAlbum from './CardAlbum';
import '../style/Search.css';

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
    const { isButtonDisabled,
      loading, albumsList, artistSearch, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="div-form col">
          {loading
            ? <Loading />
            : (
              <form className="search-form col">
                <input
                  className="search-input"
                  type="text"
                  data-testid="search-artist-input"
                  onChange={ this.handleChange }
                  placeHolder="Artista"
                />
                <button
                  className="search-button"
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
            <h3>
              Resultado de álbuns de:
              {' '}
              {search}
            </h3>
          )}
          {!albumsList.length
            ? <h3>Nenhum álbum foi encontrado</h3>
            : (
              <div className="cards row">
                {albumsList.map((album) => (
                  <CardAlbum
                    key={ album.collectionId }
                    artworkUrl100={ album.artworkUrl100 }
                    collectionName={ album.collectionName }
                    artistName={ album.artistName }
                    collectionId={ album.collectionId }
                  />
                ))}
              </div>
            )}
        </div>

      </div>
    );
  }
}

export default Search;
