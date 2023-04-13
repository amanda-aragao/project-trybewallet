import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, wallet } = this.props;
    const { cambio, expenses } = wallet;
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <span>R$: </span>
        <span data-testid="total-field">
          {
            expenses && (expenses.reduce((accumulated, actual) => accumulated
            + (Number.parseFloat(actual.value)
            * actual.exchangeRates[actual.currency].ask), 0).toFixed(2))
          }
        </span>
        <p data-testid="header-currency-field">
          { cambio }
        </p>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  wallet: PropTypes.shape({
    cambio: PropTypes.string.isRequired,
    expenses: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
      exchangeRates: PropTypes.shape(),
    })),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
  expenses: state.expenses,
});

export default connect(mapStateToProps)(Header);
