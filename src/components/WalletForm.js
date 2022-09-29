import React, { Component } from 'react';
import { func, arrayOf, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    const { firstCurrencyCode } = this.props;

    this.state = {
      value: '',
      description: '',
      currency: firstCurrencyCode,
      method: 'money',
      tag: 'food',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { handleInputChange } = this;
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Despesas:
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
          Despesas:
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
            <option value="money">Dinheiro</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
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
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: func.isRequired,
  // currencies: arrayOf(shape({})).isRequired,
  currencies: arrayOf(string).isRequired,
  firstCurrencyCode: string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  firstCurrencyCode: state.wallet.firstCurrencyCode,
});

export default connect(mapStateToProps)(WalletForm);
