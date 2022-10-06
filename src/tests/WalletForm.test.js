import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import mockInitialState from './helpers/mockInitialState';
import MOCK_INITIAL_STATE_WITH_EXPENSES from './helpers/mockInitialStateWithExpenses';
import MOCK_NEW_EXPENSE from './helpers/mockNewExpense';
import MOCK_METHODS from './helpers/mockMethods';
import MOCK_TAGS from './helpers/mockTags';

const testInputField = (testid, inputType) => {
  const inputField = screen.getByTestId(`${testid}-input`);
  expect(inputField).toBeInTheDocument();
  expect(inputField.innerHTML).toBe('');
  expect(inputField.type).toBe(inputType);
};

const testSelectField = (testid, MOCK) => {
  const selectField = screen.getByTestId(`${testid}-input`);
  const optionElements = screen.getAllByTestId(`${testid}-option`);
  const optionElementsValues = optionElements.map((element) => element.value);
  expect(selectField).toBeInTheDocument();
  expect(selectField.type).toBe('select-one');
  expect(optionElementsValues).toEqual(MOCK);
  expect(selectField).toHaveValue(optionElementsValues[0]);
};

describe('WalletForm', () => {
  it('1. should render input "value"', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: mockInitialState },
    );

    testInputField('value', 'number');
  });

  it('2. should render input "description"', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    testInputField('description', 'text');
  });

  it('3. should render input "currency"', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    testSelectField('currency', mockInitialState.wallet.currencies);
  });

  it('4. should render input "method"', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    testSelectField('method', MOCK_METHODS);
  });

  it('5. should render input "tag"', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    testSelectField('tag', MOCK_TAGS);
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

    userEvent.type(screen.getByLabelText(/valor/i), MOCK_NEW_EXPENSE.value);
    userEvent.type(screen.getByLabelText(/descrição/i), MOCK_NEW_EXPENSE.description);
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), MOCK_NEW_EXPENSE.currency);
    userEvent.selectOptions(screen.getByLabelText(/método de pagamento/i), MOCK_NEW_EXPENSE.method);
    userEvent.selectOptions(screen.getByLabelText(/tag/i), MOCK_NEW_EXPENSE.tag);

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

    expect(descriptionElement.innerHTML).toBe(MOCK_NEW_EXPENSE.description);
    expect(tagElement.innerHTML).toBe(MOCK_NEW_EXPENSE.tag);
    expect(methodElement.innerHTML).toBe(MOCK_NEW_EXPENSE.method);
    expect(valueElement.innerHTML).toBe(Number(MOCK_NEW_EXPENSE.value).toFixed(2));
    expect(currencyNameElement.innerHTML).toBe(MOCK_NEW_EXPENSE.currencyName);
    expect(convertedValueElement.innerHTML).toBe(MOCK_NEW_EXPENSE.convertedValue);
    expect(convertedCurrencyElement.innerHTML).toBe(MOCK_NEW_EXPENSE.convertedCurrency);
  });

  it('7. should be able to edit expense', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: MOCK_INITIAL_STATE_WITH_EXPENSES,
      },
    );

    const editExpenseButtons = screen.getAllByTestId('edit-btn');
    expect(editExpenseButtons).toHaveLength(2);

    userEvent.click(editExpenseButtons[1]);
    const saveEditedExpenseButton = screen.getByRole('button', { name: /editar despesa/i });
    expect(saveEditedExpenseButton).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/valor/i), '{selectall}{del}10');
    userEvent.type(screen.getByLabelText(/descrição/i), '{selectall}{del}Cinema');
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), 'CAD');
    userEvent.selectOptions(screen.getByLabelText(/método de pagamento/i), 'Cartão de crédito');
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
    expect(methodElements[1].innerHTML).toBe('Cartão de crédito');
    expect(valueElements[1].innerHTML).toBe('10.00');
    expect(currencyNameElements[1].innerHTML).toBe('Dólar Canadense/Real Brasileiro');
    expect(convertedValueElements[1].innerHTML).toBe('37.56');
    expect(convertedCurrencyElements[1].innerHTML).toBe('Real');
  });

  it('8. should throw error from api', async () => {
    const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
    const error = {
      status: 404,
      message: 'Nenhuma rota encontrada',
      code: 'NotFound',
    };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.reject(error),
    }));

    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(ENDPOINT);
    await waitFor(() => expect(screen.getByTestId('currency-input')).toHaveValue('USD'));
  });
});
