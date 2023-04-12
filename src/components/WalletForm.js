import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRequestThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRequestThunk());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <label>
          Valor:
          <input
            type="text"
            data-testid="value-input"
          />
        </label>
        <label>
          Moeda:
          <select data-testid="currency-input">
            {
              currencies.map((currencie, index) => (
                <option key={ index }>
                  {currencie}
                </option>
              ))
            }
          </select>
        </label>
        <label>
          Método de pagamento:
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label>
          Categoria:
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label>
          Descrição:
          <input
            type="text"
            data-testid="description-input"
          />
        </label>
        <button> Adicionar despesa </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
