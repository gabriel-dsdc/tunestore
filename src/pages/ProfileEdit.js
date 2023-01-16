import propTypes from 'prop-types';
import React from 'react';
import Avatar from '../assets/avatar.png';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: true,
  }

  async componentDidMount() {
    const { name, email, image, description } = await getUser();
    this.setState({ name, email, image, description, isLoading: false });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  isSendButtonDisabled = () => {
    const USER_INFO = 4;
    const { email } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regex.test(email)) {
      return true;
    }
    return Object.values(this.state).slice(0, USER_INFO).includes('');
  };

  render() {
    const { name, email, image, description, isLoading } = this.state;
    const { history } = this.props;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { !isLoading ? (
          <div style={ { display: 'flex', justifyContent: 'center' } }>
            <form
              style={ { marginTop: '70px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end' } }
            >
              <img
                className="profile-image"
                src={ image || Avatar }
                alt={ `${name} profile` }
              />
              <label htmlFor="edit-input-image">
                <b>Imagem de perfil:</b>
                <input
                  data-testid="edit-input-image"
                  id="edit-input-image"
                  className="edit-input"
                  type="text"
                  name="image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-name">
                <b>Nome:</b>
                <input
                  data-testid="edit-input-name"
                  id="edit-input-name"
                  className="edit-input"
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-email">
                <b>Email:</b>
                <input
                  data-testid="edit-input-email"
                  id="edit-input-email"
                  className="edit-input"
                  type="text"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-description" style={ { display: 'flex' } }>
                <b style={ { alignSelf: 'center' } }>Descrição:</b>
                <textarea
                  data-testid="edit-input-description"
                  id="edit-input-description"
                  className="edit-input-textarea"
                  type="text"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ this.isSendButtonDisabled() }
                onClick={ async () => {
                  this.setState({ isLoading: true });
                  await updateUser({ name, email, image, description });
                  history.push('/profile');
                } }
              >
                Salvar
              </button>
            </form>
          </div>
        ) : <Loading TagName="h1" /> }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default ProfileEdit;
