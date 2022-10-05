import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import mockInitialState from './helpers/mockInitialState';

const selectOne = 'select-one';
const cartao = 'Cartão de crédito';
const alimentacao = 'Alimentação';

describe('WalletForm', () => {
  it('1. should render input "value"', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    const valueInput = screen.getByLabelText(/valor/i);
    expect(valueInput).toBeInTheDocument();
    expect(valueInput.innerHTML).toBe('');
    expect(valueInput.type).toBe('number');
  });

  it('2. should render input "description"', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    const descriptionInput = screen.getByLabelText(/descrição/i);
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput.innerHTML).toBe('');
    expect(descriptionInput.type).toBe('text');
  });

  it('3. should render input "currency"', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    const currencyInput = screen.getByLabelText(/moeda/i);
    expect(currencyInput).toBeInTheDocument();
    expect(currencyInput.type).toBe(selectOne);

    const optionElements = screen.getAllByTestId('currency-option');
    const optionElementsValues = optionElements.map((element) => element.value);
    expect(optionElementsValues).toEqual(mockInitialState.wallet.currencies);
    expect(currencyInput).toHaveValue(optionElementsValues[0]);
  });

  it('4. should render input "method"', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    const MOCK_METHODS = ['Dinheiro', cartao, 'Cartão de débito'];

    const methodInput = screen.getByLabelText(/método de pagamento/i);
    expect(methodInput).toBeInTheDocument();
    expect(methodInput.type).toBe(selectOne);

    const optionElements = screen.getAllByTestId('method-option');
    const optionElementsValues = optionElements.map((element) => element.value);
    expect(optionElementsValues).toEqual(MOCK_METHODS);
    expect(methodInput).toHaveValue(optionElementsValues[0]);
  });

  it('5. should render input "tag"', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    const MOCK_TAGS = [
      alimentacao,
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];

    const tagInput = screen.getByLabelText(/tag/i);
    expect(tagInput).toBeInTheDocument();
    expect(tagInput.type).toBe(selectOne);

    const optionElements = screen.getAllByTestId('tag-option');
    const optionElementsValues = optionElements.map((element) => element.value);
    expect(optionElementsValues).toEqual(MOCK_TAGS);
    expect(tagInput).toHaveValue(optionElementsValues[0]);
  });

  it('6. should be able to add new expense', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);

    userEvent.type(screen.getByLabelText(/valor/i), '10');
    userEvent.type(screen.getByLabelText(/descrição/i), 'Cinema');
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), 'CAD');
    userEvent.selectOptions(screen.getByLabelText(/método de pagamento/i), cartao);
    userEvent.selectOptions(screen.getByLabelText(/tag/i), 'Lazer');

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addButton).toBeInTheDocument();
    userEvent.click(addButton);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const descriptionElement = await screen.findByTestId('tbody-description');
    const tagElement = await screen.findByTestId('tbody-tag');
    const methodElement = await screen.findByTestId('tbody-method');
    const valueElement = await screen.findByTestId('tbody-value');
    const currencyNameElement = await screen.findByTestId('tbody-currencyName');
    const convertedValueElement = await screen.findByTestId('tbody-convertedValue');
    const convertedCurrencyElement = await screen.findByTestId('tbody-convertedCurrency');

    expect(descriptionElement.innerHTML).toBe('Cinema');
    expect(tagElement.innerHTML).toBe('Lazer');
    expect(methodElement.innerHTML).toBe(cartao);
    expect(valueElement.innerHTML).toBe('10.00');
    expect(currencyNameElement.innerHTML).toBe('Dólar Canadense/Real Brasileiro');
    expect(convertedValueElement.innerHTML).toBe('37.56');
    expect(convertedCurrencyElement.innerHTML).toBe('Real');
  });

  it('7. should be able to edit expense', () => {
    const MOCK_INITIAL_STATE_WITH_EXPENSES = {
      user: {
        email: 'test@test.com',
      },
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          {
            value: '10',
            currency: 'USD',
            method: 'Dinheiro',
            tag: alimentacao,
            description: 'Pizza',
            id: 0,
            exchangeRates: mockData,
          },
          {
            value: '20',
            currency: 'USD',
            method: cartao,
            tag: 'Lazer',
            description: 'Cinema',
            id: 1,
            exchangeRates: mockData,
          },

        ],
        editor: false,
        idToEdit: 0,
        isEditing: false,

        formValues: {
          value: '',
          currency: 'USD',
          method: 'Dinheiro',
          tag: alimentacao,
          description: '',
        },
      },
    };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(MOCK_INITIAL_STATE_WITH_EXPENSES.wallet.currencies),
    }));

    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: MOCK_INITIAL_STATE_WITH_EXPENSES,
      },
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const editExpenseButtons = screen.getAllByTestId('edit-btn');
    expect(editExpenseButtons).toHaveLength(2);

    userEvent.click(editExpenseButtons[1]);
    const saveEditedExpenseButton = screen.getByRole('button', { name: /editar despesa/i });
    expect(saveEditedExpenseButton).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/valor/i), '{selectall}{del}10');
    userEvent.type(screen.getByLabelText(/descrição/i), '{selectall}{del}Cinema');
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), 'CAD');
    userEvent.selectOptions(screen.getByLabelText(/método de pagamento/i), cartao);
    userEvent.selectOptions(screen.getByLabelText(/tag/i), 'Lazer');

    userEvent.click(saveEditedExpenseButton);

    const descriptionElements = screen.getAllByTestId('tbody-description');
    const tagElements = screen.getAllByTestId('tbody-tag');
    const methodElements = screen.getAllByTestId('tbody-method');
    const valueElements = screen.getAllByTestId('tbody-value');
    const currencyNameElements = screen.getAllByTestId('tbody-currencyName');
    const convertedValueElements = screen.getAllByTestId('tbody-convertedValue');
    const convertedCurrencyElements = screen.getAllByTestId('tbody-convertedCurrency');

    expect(descriptionElements[1].innerHTML).toBe('Cinema');
    expect(tagElements[1].innerHTML).toBe('Lazer');
    expect(methodElements[1].innerHTML).toBe(cartao);
    expect(valueElements[1].innerHTML).toBe('10.00');
    expect(currencyNameElements[1].innerHTML).toBe('Dólar Canadense/Real Brasileiro');
    expect(convertedValueElements[1].innerHTML).toBe('37.56');
    expect(convertedCurrencyElements[1].innerHTML).toBe('Real');
  });
});
