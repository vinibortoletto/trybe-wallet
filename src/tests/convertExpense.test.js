import convertExpense from '../helpers/convertExpense';
import mockData from './helpers/mockData';

const MOCK_EXPENSE = {
  value: '13',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: 'test description',
  id: 0,
  exchangeRates: mockData,
};

describe('convertExpense', () => {
  it('1. should be a function', () => {
    expect(typeof convertExpense).toBe('function');
  });

  it('2. should return a number', () => {
    expect(typeof convertExpense(MOCK_EXPENSE)).toBe('number');
  });

  it('3. should convert expense value based on chosen currency', () => {
    expect(convertExpense(MOCK_EXPENSE)).toBe(61.79);
  });
});
