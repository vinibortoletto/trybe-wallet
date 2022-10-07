import React from 'react';
import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import WalletForm from '../../components/WalletForm';
import * as S from './Wallet.style';

class Wallet extends React.Component {
  render() {
    return (
      <section>
        <S.Wrapper>
          <Header />
          <WalletForm />
        </S.Wrapper>
        <Table />
      </section>
    );
  }
}

export default Wallet;
