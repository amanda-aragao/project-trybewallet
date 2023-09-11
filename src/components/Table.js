import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableContainer, Paper, TableRow,
  TableCell, TableHead, Button, TableBody } from '@mui/material/';
import { removeExpense, editExpense } from '../redux/actions';
// import { Light } from '../themes/Light';
// import { Dark } from '../themes/Dark';

class TableComponent extends Component {
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
    return expenses && expenses.length > 0 && (
      <TableContainer
        component={ Paper }
        sx={ {
          bgcolor: '#d8d4d5',
          pl: '20px',
          width: '1455px',
          display: 'flex',
          marginLeft: '160px',
          mt: '120px',
          color: '#fff',
        } }
      >

        <Table bgcolor="#d8d4d5">
          <TableHead color="#fff">
            <TableRow
              sx={ { '&:last-child td, &:last-child th': { border: 0 },
                alignItems: 'center',
                color: '#fff' } }
              color="#fff"
            >
              <TableCell align="center" color="#fff">Descrição</TableCell>
              <TableCell align="center" color="#fff">Tag</TableCell>
              <TableCell align="center" color="#fff">Método de pagamento</TableCell>
              <TableCell align="center" color="#fff">Moeda</TableCell>
              <TableCell align="center" color="#fff">Câmbio utilizado</TableCell>
              <TableCell align="center">Moeda de conversão</TableCell>
              <TableCell align="center">Editar ou Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((keyOptn) => (
              <TableRow
                key={ keyOptn.id }
                sx={ { '&:last-child td, &:last-child th': { border: 0 },
                  color: '#fff' } }
                text-align="center"
                color="#fff"
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                >
                  {keyOptn.description}

                </TableCell>
                <TableCell align="center">{keyOptn.tag}</TableCell>
                <TableCell align="center">{keyOptn.method}</TableCell>
                <TableCell align="center">{Number(keyOptn.value).toFixed(2)}</TableCell>
                <TableCell align="center">
                  {keyOptn.exchangeRates[keyOptn.currency].name}
                </TableCell>
                <TableCell align="center">
                  {Number(keyOptn.exchangeRates[keyOptn.currency].ask).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {Number(keyOptn.value * keyOptn.exchangeRates[keyOptn.currency].ask)
                    .toFixed(2)}
                </TableCell>
                <TableCell align="center">Real</TableCell>
                <TableCell sx={ { justifyContent: 'space-between' } }>
                  <Button
                    variant="contained"
                    sx={ { bgcolor: '#1282A2', color: 'fff', mr: '10px' } }
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpenseForId(keyOptn.id) }
                  >
                    Editar

                  </Button>
                  <Button
                    sx={ { ml: '10px', bgcolor: '#1282A2', color: 'fff' } }
                    variant="contained"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeExpenseforId(keyOptn.id) }
                  >
                    Excluir

                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableComponent.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TableComponent);
