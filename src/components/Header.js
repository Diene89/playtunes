import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../style/Header.css';

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
                <div className="header row">
                  <Link
                    className="link1 col"
                    to="/search"
                    data-testid="link-to-search"
                  >
                    Busca

                  </Link>
                  <Link
                    className="link2 col"
                    to="/favorites"
                    data-testid="link-to-favorites"
                  >
                    Favoritas

                  </Link>
                  <Link
                    className="link3 col"
                    to="/profile"
                    data-testid="link-to-profile"
                  >
                    Perfil

                  </Link>
                </div>
                <div className="user row">
                  <h2 data-testid="header-user-name">{user}</h2>
                </div>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
