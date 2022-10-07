import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import trybeWalletLogo from '../../assets/logo.svg';
import { FaUserCircle, FaCoins } from 'react-icons/fa';
import * as S from './Header.style';

class Header extends Component {
  sumTotalExpense = (expenses) =>
    expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const { ask } = exchangeRates[currency];
      let sum = acc;
      sum += value * ask;
      return Number(sum.toFixed(2));
    }, 0);

  render() {
    const { sumTotalExpense } = this;
    const { user, expenses } = this.props;

    return (
      <S.Header>
        <S.Logo src={trybeWalletLogo} alt="trybe wallet logo" />

        <S.Content>
          <S.TotalExpense>
            <FaCoins />
            <S.TotalExpenseText>Despesa total: </S.TotalExpenseText>
            <span data-testid="total-field">
              {sumTotalExpense(expenses).toFixed(2)}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </S.TotalExpense>

          <S.Email data-testid="email-field">
            <FaUserCircle />
            {user.email}
          </S.Email>
        </S.Content>
      </S.Header>
    );
  }
}

Header.propTypes = {
  user: shape({ email: string }).isRequired,
  expenses: arrayOf(shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
