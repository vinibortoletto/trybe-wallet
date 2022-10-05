import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

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

describe('Table', () => {
  it('1. should mount on path "/carteira"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  it('2. should render correct thead', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const theadTexts = [
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

    theadTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('3. should render expenses', () => {
    const MOCK_TABLE_CONTENT = [
      {
        description: 'Pizza',
        tag: 'Alimentação',
        method: 'Dinheiro',
        value: '10',
        currency: 'USD',
        currencyName: 'Dólar Americano/Real Brasileiro',
        currencyValue: '4.7531',
        convertedValue: '47.53',
        convertedCurrency: 'Real',
      },
      {
        description: 'Cinema',
        tag: 'Lazer',
        method: 'Cartão de crédito',
        value: '20',
        currency: 'USD',
        currencyName: 'Dólar Americano/Real Brasileiro',
        currencyValue: '4.7531',
        convertedValue: '95.06',
        convertedCurrency: 'Real',
      },
    ];

    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: MOCK_EXPENSES,
      },
    );

    MOCK_TABLE_CONTENT.forEach((expense, index) => {
      const descriptionElements = screen.getAllByTestId('tbody-description');
      expect(descriptionElements[index].innerHTML).toContain(expense.description);

      const tagElements = screen.getAllByTestId('tbody-tag');
      expect(tagElements[index].innerHTML).toBe(expense.tag);

      const methodElements = screen.getAllByTestId('tbody-method');
      expect(methodElements[index].innerHTML).toBe(expense.method);

      const valueElements = screen.getAllByTestId('tbody-value');
      expect(valueElements[index].innerHTML).toBe(Number(expense.value).toFixed(2));

      const currencyNameElements = screen.getAllByTestId('tbody-currencyName');
      expect(currencyNameElements[index].innerHTML).toBe(expense.currencyName);

      const convertedValueElements = screen.getAllByTestId('tbody-convertedValue');
      expect(convertedValueElements[index].innerHTML).toBe(expense.convertedValue);

      const convertedCurrencyElements = screen.getAllByTestId('tbody-convertedCurrency');
      expect(convertedCurrencyElements[index].innerHTML).toBe(expense.convertedCurrency);
    });
  });

  it('4. should be able to delete any expense', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: MOCK_EXPENSES,
      },
    );

    const deleteButtonId = 'delete-btn';
    expect(screen.getAllByTestId(deleteButtonId)).toHaveLength(2);
    userEvent.click(screen.getAllByTestId(deleteButtonId)[1]);
    expect(screen.getAllByTestId(deleteButtonId)).toHaveLength(1);
    userEvent.click(screen.getAllByTestId(deleteButtonId)[0]);
    expect(screen.queryByTestId(deleteButtonId)).toBeNull();
  });

  it('5. should be able to edit any expense', () => {
    // renderWithRouterAndRedux(
    // <App />,
    // { initialEntries: ['/carteira'],
    // initialState: MOCK_EXPENSES,
    // },
    // );

    // const editButtonId = 'edit-btn';
    // expect(screen.getAllByTestId(editButtonId)).toHaveLength(2);
    // userEvent.click(screen.getAllByTestId(editButtonId)[1]);

    // Como testar edição da despesa
  });
});
