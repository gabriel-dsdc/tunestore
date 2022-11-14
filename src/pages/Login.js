import propTypes from 'prop-types';
import React from 'react';
import Logo from '../assets/logo.png';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    isLoading: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { loginNameInput, history } = this.props;
    this.setState({ isLoading: true }, () => {
      createUser({ name: loginNameInput }).then(() => {
        history.push('/search');
      });
    });
  };

  render() {
    const { isLoading } = this.state;
    const { loginNameInput, isLoginButtonDisabled, handleChange } = this.props;
    return (
      <div data-testid="page-login" className="login-main-page">
        {!isLoading ? (
          <div>
            <div className="login-logo-container">
              <img className="login-logo" src={ Logo } alt="logo" />
            </div>
            <div className="login-content">
              <form>
                <input
                  data-testid="login-name-input"
                  name="loginNameInput"
                  type="text"
                  className="login-input"
                  placeholder="Nome"
                  value={ loginNameInput }
                  onChange={ handleChange }
                />
                <button
                  data-testid="login-submit-button"
                  type="submit"
                  className="login-button"
                  disabled={ isLoginButtonDisabled }
                  onClick={ this.handleSubmit }
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>) : <Loading TagName="h1" />}
      </div>
    );
  }
}

Login.propTypes = {
  loginNameInput: propTypes.string.isRequired,
  isLoginButtonDisabled: propTypes.bool.isRequired,
  handleChange: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Login;
