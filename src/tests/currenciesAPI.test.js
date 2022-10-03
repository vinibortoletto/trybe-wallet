import { fetchCurrencies, fetchCurrenciesCodes } from '../services/currenciesAPI';

jest.mock('../services/currenciesAPI');

describe.skip('fetchCurrencies', () => {
  it('1. should be a function', () => {
    expect(typeof fetchCurrencies).toBe('function');
  });

  it('2. should call fetch once', () => {
    fetchCurrencies();
    expect(fetchCurrencies).toHaveBeenCalledTimes(1);
  });

  it('3. should call fetch once', () => {
    // fetchCurrencies();
    // expect(fetchCurrencies).toHaveBeenCalledTimes(1);
  });
});

/*
  export const fetchCurrencies = async () => {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  };
*/
