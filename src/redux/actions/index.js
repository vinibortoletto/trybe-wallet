import {
  fetchCurrenciesCodes,
} from '../../services/currenciesAPI';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES_WITH_SUCCESS = 'RECEIVE_CURRENCIES_WITH_SUCCESS';
export const RECEIVE_CURRENCIES_WITH_ERROR = 'RECEIVE_CURRENCIES_WITH_ERROR';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrenciesWithSuccess = (payload) => ({
  type: RECEIVE_CURRENCIES_WITH_SUCCESS,
  payload,
});

const receiveCurrenciesWithError = (payload) => ({
  type: RECEIVE_CURRENCIES_WITH_ERROR,
  payload,
});

export const getCurrenciesCodes = () => async (dispatch) => {
  dispatch(requestCurrencies());

  try {
    const response = await fetchCurrenciesCodes();
    dispatch(receiveCurrenciesWithSuccess(response));
  } catch (error) {
    dispatch(receiveCurrenciesWithError(error));
    console.log(error);
  }
};

export const SAVE_NEW_EXPENSE = 'SAVE_NEW_EXPENSE';

export const saveNewExpense = (payload) => ({
  type: SAVE_NEW_EXPENSE,
  payload,
});
