import {
  FETCH_CURRENCIES_SUCCES, SAVE_WALLET, REMOVE_KEYOPTION_USDT_API,
  EXPENSES_ACTION, REMOVE_EXPENSE, EDIT_EXPENSE,
  EDIT_EXPENSE_FINISHED } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idToEdit: 0,
  editor: false,
  cambio: 'BRL',
  errorMessage: null,
};

const WalletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET: {
    return {
      ...state,
      idToEdit: action.payload.idToEdit,
      cambio: action.payload.cambio,
      currencies: action.payload.currencies,
      expenses: action.payload.expenses,
      editor: action.payload.editor,
    };
  } case FETCH_CURRENCIES_SUCCES: {
    return {
      ...state,
      currencies: Object.keys(action.payload.currencies),
    };
  }
  case EXPENSES_ACTION: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  }
  case REMOVE_KEYOPTION_USDT_API: {
    return {
      ...state,
      currencies: state.currencies.filter((currencie) => currencie !== 'USDT'),
    };
  }
  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: [...action.payload],
    };
  }
  case EDIT_EXPENSE: {
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  } case EDIT_EXPENSE_FINISHED: {
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: action.payload,
    };
  }
  default: return state;
  }
};

export default WalletReducer;
