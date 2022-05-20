import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Logo from '../assets/logo_mini.png';
import Avatar from '../assets/avatar.png';

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
    return (
      <header data-testid="header-component">
        <div className="header-content">
          <div className="header-logo">
            <img src={ Logo } alt="Logo da TrybeTunes" />
          </div>
          <div className="user-container">
            <img src={ Avatar } alt="Imagem de perfil" />
            <h1 data-testid="header-user-name" className="user-name-paragraph">
              {isLoading ? <Loading /> : username}
            </h1>
          </div>
          <div className="header-links">
            <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </div>
        </div>
      </header>);
  }
}

export default Header;
