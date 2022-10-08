import React, { Component } from 'react';
import { func, arrayOf, string, shape, bool, number } from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrenciesCodes,
  saveNewExpense,
  updateExpenses,
  updateFormValues,
} from '../../redux/actions';
import { fetchCurrencies } from '../../services/currenciesAPI';
import InputField from '../InputField/InputField';
import * as S from './WalletForm.style';
import SelectField from '../SelectField/SelectField';
import Field from '../Field/Field';
import Button from '../Button/Button';

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
    const { dispatch, formValues } = this.props;
    dispatch(
      updateFormValues({
        ...formValues,
        [name]: value,
      })
    );
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

    dispatch(
      saveNewExpense({
        ...formValues,
        id: expenses.length,
        exchangeRates,
      })
    );

    dispatch(updateFormValues({ ...INITIAL_STATE }));
  };

  render() {
    const { handleInputChange, handleFormSubmit, handleEditSubmit } = this;
    const { currencies, isEditing, formValues } = this.props;
    const { value, description, currency, method, tag } = formValues;

    const PAYMENT_METHODS = [
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ];

    const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <S.Form
        onSubmit={isEditing ? handleEditSubmit : handleFormSubmit}
        isEditing={isEditing}
      >
        <S.FieldsContainer>
          <Field
            type="number"
            label="Valor"
            name="value"
            value={value}
            handleInputChange={handleInputChange}
          />

          <Field
            type="text"
            label="Descrição"
            name="description"
            value={description}
            handleInputChange={handleInputChange}
          />
        </S.FieldsContainer>

        <S.FieldsContainer>
          <Field
            type="select"
            label="Moeda"
            name="currency"
            value={currency}
            handleInputChange={handleInputChange}
          >
            {currencies.map((code, index) => (
              <option key={index} value={code} data-testid="currency-option">
                {code}
              </option>
            ))}
          </Field>

          <Field
            type="select"
            label="Método de pagamento"
            name="method"
            value={method}
            handleInputChange={handleInputChange}
          >
            {PAYMENT_METHODS.map((method) => (
              <option data-testid="method-option" key={method} value={method}>
                {method}
              </option>
            ))}
          </Field>

          <Field
            type="select"
            label="Tag"
            name="tag"
            value={tag}
            handleInputChange={handleInputChange}
          >
            {TAGS.map((tag) => (
              <option key={tag} data-testid="tag-option" value={tag}>
                {tag}
              </option>
            ))}
          </Field>
        </S.FieldsContainer>

        <Button>{`${isEditing ? 'Editar' : 'Adicionar'} despesa`}</Button>
      </S.Form>
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
