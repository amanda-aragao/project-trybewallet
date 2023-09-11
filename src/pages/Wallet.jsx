import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import TableComponent from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <TableComponent />
      </>
    );
  }
}

export default connect()(Wallet);
