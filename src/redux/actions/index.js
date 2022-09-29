import currenciesAPI from '../../services/currenciesAPI';

export const SAVE_USER = 'SAVE_USER';

export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

// --------------------------------------

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

export const getCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());

  try {
    const response = await currenciesAPI();

    const currencies = Object
      .entries(response)
      .reduce((acc, currency) => {
        if (currency[1].codein !== 'BRLT') acc.push(currency[1].code);
        return acc;
      }, []);

    dispatch(receiveCurrenciesWithSuccess(currencies));
  } catch (error) {
    dispatch(receiveCurrenciesWithError(error));
    console.log(error);
  }
};
