import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_WITH_SUCCESS,
  RECEIVE_CURRENCIES_WITH_ERROR,
  SAVE_NEW_EXPENSE,
  REMOVE_EXPENSE,
  TOGGLE_EDITING_MODE,
  UPDATE_FORM_VALUES,
  UPDATE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  firstCurrencyCode: '',
  expenses: [],
  editor: false,
  idToEdit: 0,
  isEditing: false,

  formValues: {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  },
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
    return { ...state, error: action.error };
  case UPDATE_FORM_VALUES:
    return { ...state, formValues: { ...action.newFormValues } };
  case SAVE_NEW_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.newExpense,
      ],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expenseId),
    };
  case TOGGLE_EDITING_MODE:
    return {
      ...state,
      isEditing: true,
      idToEdit: action.idToEdit,
      formValues: {
        value: action.expenseToEdit.value,
        currency: action.expenseToEdit.currency,
        method: action.expenseToEdit.method,
        tag: action.expenseToEdit.tag,
        description: action.expenseToEdit.description,
      },
    };
  case UPDATE_EXPENSES:
    return { ...state, expenses: [...action.newExpenses], isEditing: false };
  default:
    return state;
  }
};

export default wallet;

/*
    1. click edit button
    2. get expense id
    3. send expense data to input form
    4. change "add expense button" to "edit expense"
    5. "edit expense" button onClick
      a. get all expenses
      b. remove edited expense from expenses
      c. add new edited expense to expenses
      d. save new expenses array
      e. toggle edit mode
      f. clean form
*/
