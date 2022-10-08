import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Header', () => {
  it('1. should not exist on path "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    expect(screen.queryByRole('banner')).toBeNull();
  });

  it('2. should mount on path "/carteira"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('3. should render a logo', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const LOGO = 'logo.svg';
    const logoElement = screen.getByRole('img', { name: /trybe wallet logo/i });
    expect(logoElement.src).toContain(LOGO);
  });

  it('4. should render user email', () => {
    const MOCK_USER = { user: { email: 'test@test.com' } };

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: MOCK_USER,
    });

    expect(screen.getByText(MOCK_USER.user.email)).toBeInTheDocument();
  });

  it('5. should render total expense as 0.00', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const totalExpenseElement = screen.getByTestId('total-field');
    expect(totalExpenseElement.innerHTML).toBe('0.00');
  });

  it('6. should render the sum of all expenses', () => {
    const MOCK_EXPENSES = {
      wallet: {
        currencies: [],
        formValues: {},
        isEditing: false,
        idToEdit: 0,
        expenses: [
          {
            value: '10',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            description: 'Pizza',
            id: 0,
            exchangeRates: mockData,
          },
          {
            value: '20',
            currency: 'USD',
            method: 'Cartão de crédito',
            tag: 'Lazer',
            description: 'Cinema',
            id: 1,
            exchangeRates: mockData,
          },
        ],
      },
    };

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: MOCK_EXPENSES,
    });

    const totalExpenseElement = screen.getByTestId('total-field');
    expect(totalExpenseElement.innerHTML).toBe('142.59');
  });
});
