import React, { Component } from 'react';
import Header from '../components/Header';
import { Loading } from './Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import CardAlbum from './CardAlbum';

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
    const { isButtonDisabled,
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
                placeHolder="Artista"
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
    );
  }
}

export default Search;
