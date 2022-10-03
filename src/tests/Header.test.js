import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import mockInitialState from './helpers/mockInitialState';
import Header from '../components/Header';

describe('Header', () => {
  it('1. should display logged email', () => {
    renderWithRedux(
      <Header />,
      { initialState: mockInitialState },
    );

    const { email } = mockInitialState.user;
    const emailElement = screen.getByTestId('email-field');
    expect(emailElement).toBeInTheDocument();
    expect(emailElement.innerHTML).toBe(email);
  });

  it('2. should display total expense', () => {
    renderWithRedux(
      <Header />,
      { initialState: mockInitialState },
    );

    const { totalExpense } = mockInitialState.wallet;
    const totalExpenseElement = screen.getByTestId('total-field');
    expect(totalExpenseElement).toBeInTheDocument();
    expect(totalExpenseElement.innerHTML).toBe(totalExpense.toFixed(2));
  });
});
