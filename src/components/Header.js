import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      user: user.name,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {
          (loading === true) ? <Loading />
            : (
              <div>
                <Link to="/search" data-testid="link-to-search">Busca</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
                <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
                <h2 data-testid="header-user-name">{user}</h2>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
