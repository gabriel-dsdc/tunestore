import React from 'react';
import Logo from '../assets/logo.png';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login" className="login-main-page">
        <div>
          <div className="login-logo-container">
            <img className="login-logo" src={ Logo } alt="Trybetunes logo" />
          </div>
          <div className="login-content" />
        </div>
      </div>
    );
  }
}

export default Login;
