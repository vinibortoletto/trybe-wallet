import convertExpense from '../../helpers/convertExpense';
import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_WITH_SUCCESS,
  RECEIVE_CURRENCIES_WITH_ERROR,
  SAVE_NEW_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  firstCurrencyCode: '',
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalExpense: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return state;

  case RECEIVE_CURRENCIES_WITH_SUCCESS:
    return {
      ...state,
      currencies: [...action.payload],
      firstCurrencyCode: [...action.payload][0],
    };

  case RECEIVE_CURRENCIES_WITH_ERROR:
    return {
      ...state,
      error: action.error,
    };

  case SAVE_NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      totalExpense: state.totalExpense + convertExpense(action.payload),
    };

  default:
    return state;
  }
};

export default wallet;
