import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  state = {
    loginNameInput: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  isLoginButtonDisabled = () => {
    const { loginNameInput } = this.state;
    const minInputLength = 3;
    if (loginNameInput.length >= minInputLength) {
      return false;
    }
    return true;
  };

  render() {
    const { loginNameInput } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ ({ history }) => (
            <Login
              history={ history }
              loginNameInput={ loginNameInput }
              isLoginButtonDisabled={ this.isLoginButtonDisabled() }
              onInputChange={ this.handleChange }
            />
          ) }
        />
        <Route
          path="/search"
          render={ ({ history }) => (
            <Search history={ history } />) }
        />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
