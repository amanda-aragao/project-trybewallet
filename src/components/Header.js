import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenseList, cambio } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          {expenseList}
        </p>
        <p data-testid="header-currency-field">
          { cambio }
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenseList: PropTypes.number.isRequired,
  cambio: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
