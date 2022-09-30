import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions/user';

class Login extends Component {
  state = {
    isButtonDisabled: true,
    email: '',
    password: '',
  };

  validateForm = () => {
    const { email, password } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;

    const isFormValid = (
      emailRegex.test(email)
      && password.length >= passwordMinLength
    );

    this.setState({ isButtonDisabled: !isFormValid });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateForm);
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(saveUser(email));

    this.setState({
      email: '',
      password: '',
    });

    history.push('/carteira');
  };

  render() {
    const { isButtonDisabled, email, password } = this.state;

    return (
      <section>
        <form onSubmit={ this.handleFormSubmit }>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleInputChange }
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleInputChange }
            />
          </label>

          <button
            type="submit"
            disabled={ isButtonDisabled }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
  history: shape({}).isRequired,
};

export default connect()(Login);
