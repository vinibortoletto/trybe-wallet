import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import { connect } from 'react-redux';
import trybeWalletLogo from '../assets/trybe-wallet-logo.png';

class Header extends Component {
  render() {
    const { user } = this.props;

    return (
      <header>
        <div>
          <img src={ trybeWalletLogo } alt="trybe wallet logo" />
        </div>

        <div>
          <span data-testid="email-field">{user.email}</span>
          <span>
            Despesa total: R$
            <span data-testid="total-field">0</span>
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </div>

      </header>
    );
  }
}

Header.propTypes = {
  user: shape({
    email: string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Header);
