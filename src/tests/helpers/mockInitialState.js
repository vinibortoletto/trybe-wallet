import mockData from './mockData';

const mockInitialState = {
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
    firstCurrencyCode: 'USD',
    expenses: [],
    editor: false,
    idToEdit: 0,
    totalExpense: 0,
  },
};

export default mockInitialState;
