import sumTotalExpense from '../helpers/sumTotalExpense';
import mockData from './helpers/mockData';

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

const MOCK_SUM = 142.59;

describe('sumTotalExpense', () => {
  it('1. should be a function', () => {
    expect(typeof sumTotalExpense).toBe('function');
  });

  it('2. should receive an array as parameter', () => {
    expect(typeof sumTotalExpense(MOCK_EXPENSES)).toBe('number');
  });

  it('3. should return a number', () => {
    expect(typeof sumTotalExpense(MOCK_EXPENSES)).toBe('number');
  });

  it('3. should return the sum of all expenses', () => {
    expect(sumTotalExpense(MOCK_EXPENSES)).toBe(MOCK_SUM);
  });
});
