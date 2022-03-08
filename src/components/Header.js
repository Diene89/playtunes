import React, { Component } from 'react';
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
              <h2 data-testid="header-user-name">{user}</h2>
            )
        }
      </header>
    );
  }
}

export default Header;
