import mockData from './mockData';

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
    editor: false,
    idToEdit: 0,
    isEditing: false,

    formValues: {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    },
  },
};

export default MOCK_INITIAL_STATE_WITH_EXPENSES;
