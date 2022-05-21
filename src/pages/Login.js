import React from 'react';
import propTypes from 'prop-types';
import Logo from '../assets/logo.png';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
    const { loginNameInput, isLoginButtonDisabled, onInputChange } = this.props;
    return (
      <div data-testid="page-login" className="login-main-page">
        {!isLoading ? (
          <div>
            <div className="login-logo-container">
              <img className="login-logo" src={ Logo } alt="Trybetunes logo" />
            </div>
            <div className="login-content">
              <form>
                <input
                  data-testid="login-name-input"
                  name="loginNameInput"
                  type="text"
                  className="login-input"
                  value={ loginNameInput }
                  onChange={ onInputChange }
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
  onInputChange: propTypes.func.isRequired,
  history: propTypes.shape(propTypes.any),
};

Login.defaultProps = {
  history: {},
};

export default Login;
