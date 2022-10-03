import React, { Component } from 'react';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  convertToDecimal = (number) => Number(number).toFixed(2);

  render() {
    const { convertToDecimal } = this;
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({
            id, description, tag, method, value, exchangeRates, currency,
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{convertToDecimal(value)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{convertToDecimal(exchangeRates[currency].ask)}</td>
              <td>{convertToDecimal(exchangeRates[currency].ask * value)}</td>
              <td>Real</td>
              <td>📝 ❌</td>
            </tr>
          ))}
        </tbody>
      </table>

    );
  }
}

Table.propTypes = {
  expenses: arrayOf(shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
