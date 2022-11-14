import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../assets/avatar.png';
import Logo from '../assets/logo_mini.png';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    username: '',
    isLoading: true,
  }

  componentDidMount() {
    getUser().then(({ name }) => (
      this.setState({ username: name }, this.setState({ isLoading: false }))));
  }

  render() {
    const { username, isLoading } = this.state;
    const { currentLink } = this.props;
    return (
      <header data-testid="header-component">
        <div className="header-content">
          <Link to="/">
            <div className="header-logo">
              <img src={ Logo } alt="Logo" />
            </div>
          </Link>
          <div className="user-container">
            <img src={ Avatar } alt="Imagem de perfil" />
            <b data-testid="header-user-name" className="user-name-paragraph">
              {isLoading ? <Loading /> : username}
            </b>
          </div>
          <div className="header-links">
            <Link
              data-testid="link-to-search"
              to="/search"
              className={ currentLink === 'search' ? 'active' : '' }
            >
              Pesquisa
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className={ currentLink === 'favorites' ? 'active' : '' }
            >
              Favoritos
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className={ currentLink === 'profile' ? 'active' : '' }
            >
              Perfil
            </Link>
          </div>
        </div>
      </header>);
  }
}

Header.propTypes = {
  currentLink: propTypes.string,
};

Header.defaultProps = {
  currentLink: 'profile',
};

export default Header;
