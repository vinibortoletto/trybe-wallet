import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockInitialState from './helpers/mockInitialState';

const testInputField = (testid, inputType) => {
  const inputField = screen.getByTestId(`${testid}-input`);
  expect(inputField).toBeInTheDocument();
  expect(inputField.type).toBe(inputType);
};

const testSelectField = async (testid, MOCK_VALUES) => {
  const selectField = screen.getByTestId(`${testid}-input`);
  const optionsFields = await screen.findAllByTestId(`${testid}-option`);
  const optionsValues = optionsFields.map((tag) => tag.value);

  expect(selectField).toBeInTheDocument();
  expect(selectField.type).toBe('select-one');
  expect(selectField).toHaveValue(MOCK_VALUES[0]);
  expect(optionsValues).toEqual(MOCK_VALUES);

  userEvent.selectOptions(selectField, MOCK_VALUES[1]);
  expect(selectField).toHaveValue(MOCK_VALUES[1]);
};

describe('WalletForm', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: mockInitialState,
      },
    );
  });

  it('1. should render value field', () => {
    testInputField('value', 'number');
  });

  it('2. should render description field', () => {
    testInputField('description', 'text');
  });

  it('3. should render currency field', async () => {
    const { currencies: MOCK_CURRENCY_OPTIONS } = mockInitialState.wallet;
    testSelectField('currency', MOCK_CURRENCY_OPTIONS);
  });

  it('4. should render method field', async () => {
    const MOCK_METHOD_OPTIONS = [
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ];

    testSelectField('method', MOCK_METHOD_OPTIONS);
  });

  it('5. should render tag field', async () => {
    const MOCK_TAG_OPTIONS = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];

    testSelectField('tag', MOCK_TAG_OPTIONS);
  });

  it.skip('6. should be able to add new expense', () => {
    userEvent.type(screen.getByTestId('value-input'), '13');
    userEvent.type(screen.getByTestId('description-input'), 'test');
    userEvent.selectOptions(screen.getByTestId('currency-input'), 'JPY');
    userEvent.selectOptions(screen.getByTestId('method-input'), 'Cartão de débito');
    userEvent.selectOptions(screen.getByTestId('tag-input'), 'Saúde');
    userEvent.click(screen.getByRole('button', { name: /adicionar/i }));
    // expect().();
  });
});
