import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isButtonDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const minCharacters = 2;
    this.setState({
      isButtonDisable: target.value.length < minCharacters,
      artistName: target.value,
    });
  }

  render() {
    const { isButtonDisable, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ artistName }
            placeholder="Artista"
          />
          <input
            data-testid="search-artist-button"
            type="button"
            disabled={ isButtonDisable }
            value="Procurar"
          />
        </div>
      </div>
    );
  }
}

export default Search;
