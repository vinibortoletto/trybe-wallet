import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../../redux/actions/user';
import logo from '../../assets/logo.svg';
import * as S from './Login.style';
import InputField from '../../components/InputField/InputField';
import Field from '../../components/Field/Field';
import Button from '../../components/Button/Button';

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

    const isFormValid =
      emailRegex.test(email) && password.length >= passwordMinLength;

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
      <S.Section>
        <S.Container>
          <S.Logo>
            <img src={logo} alt="trybe wallet logo" />
          </S.Logo>

          <form onSubmit={this.handleFormSubmit}>
            <Field
              type="text"
              name="email"
              value={email}
              label="Email"
              handleInputChange={this.handleInputChange}
            />

            <Field
              type="password"
              name="password"
              value={password}
              label="Senha"
              handleInputChange={this.handleInputChange}
            />

            <Button isButtonDisabled={isButtonDisabled}>Entrar</Button>
          </form>
        </S.Container>
      </S.Section>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
  history: shape({}).isRequired,
};

export default connect()(Login);
