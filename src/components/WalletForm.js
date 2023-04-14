import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpensesThunk, fetchRequestThunk,
  editExpenseFinished } from '../redux/actions';

const globalState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
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
    const { currencies, expenses, editor } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <div>
        WalletForm
        <form>

          <label htmlFor="value">
            Valor:
            <input
              onChange={ this.handleChange }
              type="number"
              data-testid="value-input"
              value={ value }
              name="value"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
              name="currency"
            >
              {
                currencies.map((currencie, index) => (
                  <option key={ index }>
                    {currencie}
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              onChange={ this.handleChange }
              data-testid="method-input"
              value={ method }
              name="method"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
              name="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              onChange={ this.handleChange }
              type="text"
              data-testid="description-input"
              value={ description }
              name="description"
            />
          </label>
          { !editor ? (
            <button
              type="button"
              onClick={ this.handleClickButton }
            >
              Adicionar despesa
            </button>)
            : (
              <button
                type="button"
                onClick={ this.editExpenseFinish }
              >
                Editar despesa
              </button>)}
        </form>
        {
          expenses && expenses.map((e) => (<p key={ e.id } />))
        }
      </div>

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
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
