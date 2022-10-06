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

  const response = await fetchCurrenciesCodes();
  if (!response.status) dispatch(receiveCurrenciesWithSuccess(response));
  else dispatch(receiveCurrenciesWithError(response));
};

export const UPDATE_FORM_VALUES = 'UPDATE_FORM_VALUES';
export const updateFormValues = (newFormValues) => ({
  type: UPDATE_FORM_VALUES,
  newFormValues,
});

export const SAVE_NEW_EXPENSE = 'SAVE_NEW_EXPENSE';

export const saveNewExpense = (newExpense) => ({
  type: SAVE_NEW_EXPENSE,
  newExpense,
});

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const removeExpense = (expenseId) => ({
  type: REMOVE_EXPENSE,
  expenseId,
});

export const TOGGLE_EDITING_MODE = 'TOGGLE_EDITING_MODE';
export const toggleEditingMode = (expenseToEdit) => ({
  type: TOGGLE_EDITING_MODE,
  idToEdit: expenseToEdit.id,
  expenseToEdit,
});

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const updateExpenses = (newExpenses) => ({
  type: UPDATE_EXPENSES,
  newExpenses,
});
