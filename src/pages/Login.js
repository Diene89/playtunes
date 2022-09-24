import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import { Loading } from './Loading';
import '../style/Login.css';
import imgMusic from '../style/purpleMusic.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isButtonDisable: true,
      user: '',
      loading: false,
      redirect: false,
    };
  }

  handleNameChange = ({ target }) => {
    const minCharacters = 3;
    this.setState({
      isButtonDisable: target.value.length < minCharacters,
      user: target.value,
    });
  }

  // Logica desenvolvida com ajuda do Imar

  handleButtonClick = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({
      loading: true,
    },
    async () => {
      await createUser({ name: user });
      this.setState({
        loading: false,
        redirect: true,
      });
    });
  }

  render() {
    const { isButtonDisable, loading, redirect } = this.state;
    return (
      <div className="login-container row" data-testid="page-login">
        { !loading ? (
          <form className="col">
            <img src={ imgMusic } alt="imagem de fone" />
            <input
              data-testid="login-name-input"
              type="text"
              onChange={ this.handleNameChange }
              placeholder="Nome"
            />
            <input
              data-testid="login-submit-button"
              type="button"
              disabled={ isButtonDisable }
              onClick={ this.handleButtonClick }
              value="Entrar"
            />
          </form>
        ) : <Loading /> }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
