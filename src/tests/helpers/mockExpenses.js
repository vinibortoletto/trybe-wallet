import mockData from './mockData';

const MOCK_EXPENSES = [
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
    id: 0,
    exchangeRates: mockData,
  },
];

export default MOCK_EXPENSES;
