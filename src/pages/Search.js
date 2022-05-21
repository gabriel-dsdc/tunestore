import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    searchInput: '',
    isSearchButtonDisabled: true,
    isLoading: false,
    currentSearch: '',
    albums: [],
  }

  handleClick = (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({ searchInput: '', isLoading: true, currentSearch: searchInput },
      () => {
        searchAlbumsAPI(searchInput).then((response) => {
          this.setState({ isLoading: false, albums: response });
        });
      });
  }

  isSearchDisabled = () => {
    const { searchInput } = this.state;
    if (searchInput.length >= 2) {
      this.setState({ isSearchButtonDisabled: false });
    } else {
      this.setState({ isSearchButtonDisabled: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.isSearchDisabled);
  }

  render() {
    const { searchInput, isSearchButtonDisabled,
      isLoading, currentSearch, albums } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-search">
        <Header currentLink="search" />
        <div className="search-input-content">
          {!isLoading ? (
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                className="input-area"
                name="searchInput"
                value={ searchInput }
                onChange={ this.handleChange }
              />
              <button
                data-testid="search-artist-button"
                type="submit"
                className="search-button"
                disabled={ isSearchButtonDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>) : <Loading TagName="h1" />}
        </div>
        <div className="albums-content">
          {currentSearch && (
            <>
              <br />
              {albums.length !== 0 ? (
                <>
                  <p>
                    Resultado de álbuns de:
                    {' '}
                    {currentSearch}
                  </p>
                  <div className="album-card-content">
                    {albums.map(
                      ({ artistName, artworkUrl100, collectionId, collectionName }) => (
                        <div key={ collectionId } className="album-card">
                          <img src={ artworkUrl100 } alt={ collectionName } />
                          <p className="album-collection-name">{collectionName}</p>
                          <p>{artistName}</p>
                          <button
                            data-testid={ `link-to-album-${collectionId}` }
                            type="submit"
                            className="album-button"
                            onClick={ () => { history.push(`/album/${collectionId}`); } }
                          >
                            Ir para o álbum
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                </>
              ) : <div className="loading"><h1>Nenhum álbum foi encontrado</h1></div>}
            </>)}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  history: propTypes.shape(propTypes.any),
};

Search.defaultProps = {
  history: {},
};

export default Search;
