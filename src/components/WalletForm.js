import React, { Component } from 'react';
import { func, arrayOf, string, shape } from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrenciesCodes,
  saveNewExpense,
} from '../redux/actions';
import { fetchCurrencies } from '../services/currenciesAPI';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesCodes());
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;
    const exchangeRates = await fetchCurrencies();

    dispatch(
      saveNewExpense({
        ...this.state,
        id: expenses.length,
        exchangeRates,
      }),
    );

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { handleInputChange, handleFormSubmit } = this;
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form onSubmit={ handleFormSubmit }>
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

        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  expenses: arrayOf(shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  firstCurrencyCode: state.wallet.firstCurrencyCode,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
