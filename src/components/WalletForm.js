import React, { Component } from 'react';
import { func, arrayOf, string, shape, bool, number } from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrenciesCodes,
  saveNewExpense,
  updateExpenses,
  updateFormValues,
} from '../redux/actions';
import { fetchCurrencies } from '../services/currenciesAPI';

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class WalletForm extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesCodes());
  }

  handleInputChange = ({ target: { name, value } }) => {
    // const { formValues } = this.props;
    // this.setState({ [name]: value });

    const { dispatch, formValues } = this.props;
    dispatch(updateFormValues({
      ...formValues,
      [name]: value,
      // value: '',
      // currency: 'USD',
      // method: 'Dinheiro',
      // tag: 'Alimentação',
      // description: '',
    }));
  };

  handleEditSubmit = (event) => {
    event.preventDefault();
    const { dispatch, expenses, idToEdit, formValues } = this.props;
    const newExpenses = expenses.map((expense) => {
      if (expense.id === idToEdit) return { ...expense, ...formValues };
      return expense;
    });

    dispatch(updateExpenses(newExpenses));
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, expenses, formValues } = this.props;
    const exchangeRates = await fetchCurrencies();

    // dispatch(
    //   saveNewExpense({
    //     ...this.state,
    //     id: expenses.length,
    //     exchangeRates,
    //   }),
    // );

    // this.setState({ ...INITIAL_STATE });

    dispatch(
      saveNewExpense({
        ...formValues,
        id: expenses.length,
        exchangeRates,
      }),
    );
    dispatch(updateFormValues({ ...INITIAL_STATE }));
  };

  render() {
    const { handleInputChange, handleFormSubmit, handleEditSubmit } = this;
    const {
      currencies,
      isEditing,
      // editingExpense,
      formValues,
    } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = formValues;

    // const {
    //   value,
    //   description,
    //   currency,
    //   method,
    //   tag,
    // } = this.state;

    return (
      <form
        onSubmit={ isEditing ? handleEditSubmit : handleFormSubmit }
        style={ { border: isEditing ? '3px solid green' : 'none' } }
      >
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            value={ value }
            onChange={ handleInputChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ handleInputChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ handleInputChange }
          >
            {currencies.map((code) => (
              <option
                key={ code }
                value={ code }
                data-testid="currency-option"
              >
                {code}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ handleInputChange }
          >
            <option
              data-testid="method-option"
              value="Dinheiro"
            >
              Dinheiro
            </option>
            <option
              data-testid="method-option"
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>
            <option
              data-testid="method-option"
              value="Cartão de débito"
            >
              Cartão de débito
            </option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ handleInputChange }
          >
            <option data-testid="tag-option" value="Alimentação">Alimentação</option>
            <option data-testid="tag-option" value="Lazer">Lazer</option>
            <option data-testid="tag-option" value="Trabalho">Trabalho</option>
            <option data-testid="tag-option" value="Transporte">Transporte</option>
            <option data-testid="tag-option" value="Saúde">Saúde</option>
          </select>
        </label>

        <button type="submit">
          {`${isEditing ? 'Editar' : 'Adicionar'} despesa`}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  expenses: arrayOf(shape({})).isRequired,
  formValues: shape({}).isRequired,
  isEditing: bool.isRequired,
  idToEdit: number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  firstCurrencyCode: state.wallet.firstCurrencyCode,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
  formValues: state.wallet.formValues,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
