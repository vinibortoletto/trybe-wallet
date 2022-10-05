import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Login', () => {
  it('1. should mount on path "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('2. should render empty email and password field', () => {
    renderWithRouterAndRedux(<App />);

    const emailField = screen.getByLabelText(/email/i);
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveValue('');

    const passwordField = screen.getByLabelText(/senha/i);
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveValue('');
  });

  it('3. should render a disabled login button', () => {
    renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('4. should only accept valid email and password', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/senha/i);

    userEvent.type(emailField, 'invalid email');
    userEvent.type(passwordField, '12345');
    expect(loginButton).toBeDisabled();

    userEvent.type(emailField, 'test@test.com');
    userEvent.type(passwordField, '123456');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/carteira');
  });
});
