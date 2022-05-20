import React from 'react';
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
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{isLoading ? <Loading /> : username}</h1>
      </header>);
  }
}

export default Header;
