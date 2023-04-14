import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../redux/actions';

class Table extends Component {
  removeExpenseforId = (id) => {
    const { dispatch, expenses } = this.props;
    const expenseFiltered = expenses.filter((expense) => expense.id !== id);
    dispatch(removeExpense(expenseFiltered));
  };

  editExpenseForId = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

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
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpenseForId(keyOptn.id) }

                  >
                    Editar

                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeExpenseforId(keyOptn.id) }
                  >
                    Excluir

                  </button>
                </td>
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
  expenses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
