import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockInitialState from './helpers/mockInitialState';

const MOCK_EXPENSE = {
  description: 'Cinema',
  tag: 'Lazer',
  method: 'Cartão de crédito',
  value: '50',
  currency: 'USD',
  currencyName: 'Dólar Americano/Real Brasileiro',
  currencyValue: '5.17',
  convertedValue: '258.27',
  convertedCurrency: 'Real',
};

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

    // COMO FAZER TEARDOWN
  });

  it('1. should render value field', () => {
    testInputField('value', 'number');
  });

  it('2. should render description field', () => {
    testInputField('description', 'text');
  });

  it('3. should render currency field', () => {
    const { currencies: MOCK_CURRENCY_OPTIONS } = mockInitialState.wallet;
    testSelectField('currency', MOCK_CURRENCY_OPTIONS);
  });

  it('4. should render method field', () => {
    const MOCK_METHOD_OPTIONS = [
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ];

    testSelectField('method', MOCK_METHOD_OPTIONS);
  });

  it('5. should render tag field', () => {
    const MOCK_TAG_OPTIONS = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];

    testSelectField('tag', MOCK_TAG_OPTIONS);
  });

  it('6. should render a table element', () => {
    const MOCK_TABLE_HEADS = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    MOCK_TABLE_HEADS.forEach((head) => {
      expect(screen.getByText(head)).toBeInTheDocument();
    });
  });

  it('7. should be able to add new expense', async () => {
    userEvent.type(screen.getByTestId('value-input'), MOCK_EXPENSE.value);
    userEvent.type(screen.getByTestId('description-input'), MOCK_EXPENSE.description);
    userEvent.selectOptions(screen.getByTestId('currency-input'), MOCK_EXPENSE.currency);
    userEvent.selectOptions(screen.getByTestId('method-input'), MOCK_EXPENSE.method);
    userEvent.selectOptions(screen.getByTestId('tag-input'), MOCK_EXPENSE.tag);
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(
      await (await screen.findByTestId('td-description')).innerHTML,
    ).toBe(MOCK_EXPENSE.description);

    expect(
      await (await screen.findByTestId('td-tag')).innerHTML,
    ).toBe(MOCK_EXPENSE.tag);

    expect(
      await (await screen.findByTestId('td-method')).innerHTML,
    ).toBe(MOCK_EXPENSE.method);

    expect(
      await (await screen.findByTestId('td-value')).innerHTML,
    ).toBe(Number(MOCK_EXPENSE.value).toFixed(2));

    expect(
      await (await screen.findByTestId('td-currencyName')).innerHTML,
    ).toBe(MOCK_EXPENSE.currencyName);

    expect(
      await (await screen.findByTestId('td-currencyValue')).innerHTML,
    ).toBe(MOCK_EXPENSE.currencyValue);

    expect(
      await (await screen.findByTestId('td-convertedValue')).innerHTML,
    ).toBe(MOCK_EXPENSE.convertedValue);

    expect(
      await (await screen.findByTestId('td-convertedCurrency')).innerHTML,
    ).toBe(MOCK_EXPENSE.convertedCurrency);

    expect(await screen.findByTestId('edit-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('delete-btn')).toBeInTheDocument();
  });
});
