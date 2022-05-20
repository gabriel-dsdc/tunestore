import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchInput: '',
  }

  render() {
    const { searchInput } = this.state;
    const isSearchDisabled = () => {
      if (searchInput.length >= 2) {
        return false;
      }
      return true;
    };
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-input-content">
          <input
            data-testid="search-artist-input"
            type="text"
            className="input-area"
            name="searchInput"
            value={ searchInput }
            onChange={ ({ target: { name, value } }) => this.setState({ [name]: value }) }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            className="search-button"
            disabled={ isSearchDisabled() }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
