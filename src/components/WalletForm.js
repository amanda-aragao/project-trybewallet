/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControl, TextField, Select, MenuItem,
  InputAdornment, InputLabel, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { fetchExpensesThunk, fetchRequestThunk,
  editExpenseFinished } from '../redux/actions';

const globalState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  theme: 'light',
};

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRequestThunk());
  }

  componentDidUpdate(prev) {
    const { editor, idToEdit, expenses } = this.props;
    if (prev.editor !== editor && editor === true) {
      this.setState({
        value: expenses[idToEdit].value,
        description: expenses[idToEdit].description,
        currency: expenses[idToEdit].currency,
        method: expenses[idToEdit].method,
        tag: expenses[idToEdit].tag,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClickButton = (click) => {
    click.preventDefault();
    const { dispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    this.setState({
      id: id + 1,
    });
    dispatch(fetchExpensesThunk(expense));
    this.setState(
      globalState,
    );
  };

  editExpenseFinish = () => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, idToEdit, expenses } = this.props;
    const newArrayExpenses = [...expenses];
    newArrayExpenses[idToEdit] = { // usando idToEdit como posição do array
      ...expenses[idToEdit],
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(editExpenseFinished(newArrayExpenses));
    this.setState(
      globalState,
    );
  };

  render() {
    const { currencies, editor, expenses } = this.props;
    const { value, description, method, currency, tag } = this.state;
    return (
      <Box
        sx={ { pt: '50px',
          width: '1400px',
          pb: '48px',
          mt: '200px',
          display: 'flex',
          paddingLeft: ' 50px',
          gap: '10px',
          bgcolor: '#fdc500',
          marginLeft: '170px',
          borderRadius: '5px',

        } }
      >
        <FormControl sx={ { width: '340px', color: '#000000' } } variant="outlined">
          <TextField
            sx={ { fontPalette: '#fff' } }
            id="input-with-icon-textfield"
            label="Valor:"
            data-testid="value-input"
            onChange={ this.handleChange }
            name="value"
            value={ value }
            type="text"
            autoComplete="off"
            InputLabelProps={ {
              style: { color: '#000000', fontSize: 16 },

            } }
            InputProps={ { startAdornment: (
              <InputAdornment
                position="end"
                sx={ {
                  color: '#000000',
                } }
              >
                <AttachMoneyIcon sx={ { color: '#000000' } } />
              </InputAdornment>
            ),
            } }
          />
        </FormControl>
        <FormControl
          sx={ { width: '340px',
            textAlign: 'center',
            color: '#fff' } }
          variant="outlined"
        >
          <InputLabel
            sx={ { color: '#000000', fontSize: '15px', align: 'center' } }
            id="demo-simple-select-label"
          >
            Moeda

          </InputLabel>
          <Select
            value={ currency }
            label="Moeda"
            name="currency"
            onChange={ this.handleChange }
            sx={ { color: '#000000' } }
          >
            {currencies.map((currencie, index) => (
              <MenuItem key={ index } value={ currencie }>{ currencie }</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={ { width: '850px' } } variant="outlined">
          <TextField
            autoComplete="off"
            onChange={ this.handleChange }
            type="text"
            data-testid="description-input"
            value={ description }
            name="description"
            id="input-with-icon-textfield"
            label="Descrição:"
            sx={ { color: '#fff' } }
            InputLabelProps={ {
              style: { color: '#000000', fontSize: 16 },
            } }
            InputProps={ { startAdornment: (
              <InputAdornment position="end">
                <EditIcon sx={ { color: '##000000', mr: '15px' } } />
              </InputAdornment>
            ),
            } }
          />
        </FormControl>
        <FormControl variant="outlined" sx={ { width: '390px', textAlign: 'center' } }>
          <InputLabel id="demo-simple-select-label" sx={ { color: '#000000' } }>
            Método de pagamento:
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Método de pagamento:"
            onChange={ this.handleChange }
            data-testid="method-input"
            value={ method }
            name="method"
          >
            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
            <MenuItem value="Cartão de cŕedito">Cartão de crédito</MenuItem>
            <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          display="flex"
          sx={ { width: '350px',
            textAlign: 'center',
          } }
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-label" sx={ { color: '#000000' } }>
            Categoria:
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Método de pagamento:"
            onChange={ this.handleChange }
            data-testid="method-input"
            value={ tag }
            name="tag"
          >
            <MenuItem value="Alimentação">Alimentação</MenuItem>
            <MenuItem value="Lazer">Lazer</MenuItem>
            <MenuItem value="Trabalho">Trabalho</MenuItem>
            <MenuItem value="Transporte">Transporte</MenuItem>
            <MenuItem value="Saúde">Saúde</MenuItem>
          </Select>
        </FormControl>
        { !editor ? (
          <Button
            variant="contained"
            className="buttonEnter"
            sx={ { width: '400px', height: '55px', mr: '40px', bgcolor: '#1282A2' } }
            type="button"
            onClick={ this.handleClickButton }
          >
            Adicionar despesa
          </Button>)
          : (
            <Button
              variant="contained"
              className="buttonEnter"
              sx={ { width: '400px', height: '55px', mr: '40px', bgcolor: '#1282A2' } }
              type="button"
              onClick={ this.editExpenseFinish }
            >
              Editar despesa
            </Button>)}
        { expenses && expenses.map((e) => (<p key={ e.id } />))}
      </Box>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});
WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps)(WalletForm);
