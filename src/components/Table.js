import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
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
            {expenses.map((keyOptn) => (
              <tr key={ keyOptn.id }>
                <td>{keyOptn.description}</td>
                <td>{keyOptn.tag}</td>
                <td>{keyOptn.method}</td>
                <td>{Number(keyOptn.value).toFixed(2)}</td>
                <td>{keyOptn.exchangeRates[keyOptn.currency].name}</td>
                <td>{Number(keyOptn.exchangeRates[keyOptn.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(keyOptn.value * keyOptn.exchangeRates[keyOptn.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
};

export default connect(mapStateToProps)(Table);
