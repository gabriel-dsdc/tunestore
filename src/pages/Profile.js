import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../assets/avatar.png';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    user: {},
    isLoading: true,
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, isLoading: false });
  }

  render() {
    const { user: { name, email, image, description }, isLoading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { !isLoading ? (
          <div style={ { display: 'flex', justifyContent: 'center' } }>
            <div style={ { marginTop: '70px' } }>
              <div>
                <img
                  data-testid="profile-image"
                  src={ image || Avatar }
                  alt={ `${name}profile` }
                />
                <Link to="/profile/edit">
                  <button type="button">Editar perfil</button>
                </Link>
              </div>
              <div>
                <b>Nome</b>
                <p>{name}</p>
              </div>
              <div>
                <b>Email</b>
                <p>{email}</p>
              </div>
              <div>
                <b>Descrição</b>
                <p>{description}</p>
              </div>
            </div>
          </div>
        ) : <Loading TagName="h1" />}
      </div>
    );
  }
}

export default Profile;
