import React, { Component } from 'react';
import { arrayOf, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, toggleEditingMode } from '../redux/actions';

class Table extends Component {
  convertToDecimal = (number) => Number(number).toFixed(2);

  render() {
    const { convertToDecimal } = this;
    const { expenses, dispatch } = this.props;

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
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td data-testid="td-description">{expense.description}</td>
              <td data-testid="td-tag">{expense.tag}</td>
              <td data-testid="td-method">{expense.method}</td>
              <td data-testid="td-value">{convertToDecimal(expense.value)}</td>
              <td data-testid="td-currencyName">
                {expense.exchangeRates[expense.currency].name}
              </td>
              <td data-testid="td-currencyValue">
                {convertToDecimal(expense.exchangeRates[expense.currency].ask)}
              </td>
              <td data-testid="td-convertedValue">
                {convertToDecimal(
                  expense.exchangeRates[expense.currency].ask * expense.value,
                )}
              </td>
              <td data-testid="td-convertedCurrency">Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => dispatch(toggleEditingMode(expense)) }
                >
                  📝
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => dispatch(removeExpense(expense.id)) }
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    );
  }
}

Table.propTypes = {
  expenses: arrayOf(shape({})).isRequired,
  dispatch: func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

export default connect(mapStateToProps)(Table);
