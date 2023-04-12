import { FETCH_CURRENCIES_FAILED, FETCH_CURRENCIES_REQUEST,
  FETCH_CURRENCIES_SUCCES, SAVE_WALLET, REMOVE_KEYOPTION_USDT_API } from '../actions';

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
  }
  case FETCH_CURRENCIES_REQUEST: {
    return {
      ...state,
    };
  }
  case FETCH_CURRENCIES_SUCCES: {
    return {
      ...state,
      currencies: Object.keys(action.payload.currencies),
    };
  }
  case FETCH_CURRENCIES_FAILED: {
    return {
      ...state,
      errorMessage: action.payload.errorMessage,
    };
  }
  case REMOVE_KEYOPTION_USDT_API: {
    return {
      ...state,
      currencies: state.currencies.filter((currencie) => currencie !== 'USDT'),
    };
  }
  default: return state;
  }
};

export default WalletReducer;