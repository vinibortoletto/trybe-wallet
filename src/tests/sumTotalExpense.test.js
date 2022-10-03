import sumTotalExpense from '../helpers/sumTotalExpense';
import MOCK_EXPENSES from './helpers/mockExpenses';

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
