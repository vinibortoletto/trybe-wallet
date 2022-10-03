import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <WalletForm />
        <Table />
      </section>
    );
  }
}

export default Wallet;
