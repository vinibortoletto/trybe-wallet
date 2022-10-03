import React, { Component } from 'react';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

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
              <td>
                <button type="button">📝</button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => dispatch(removeExpense(id)) }
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

/*

  - Após o botão ser clicado, a seguintes ações deverão ocorrer:

    [x] A despesa deverá ser deletada do estado global

    [ ] A despesa deixará de ser exibida na tabela

    [ ] O valor total exibido no header será alterado.
*/

Table.propTypes = {
  expenses: arrayOf(shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
