import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import trybeWalletLogo from '../assets/logo.svg';

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
      <header>
        <div>
          <img src={trybeWalletLogo} alt="trybe wallet logo" />
        </div>

        <div>
          <span data-testid="email-field">{user.email}</span>
          <span>
            Despesa total: R$
            <span data-testid="total-field">
              {sumTotalExpense(expenses).toFixed(2)}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </div>
      </header>
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
