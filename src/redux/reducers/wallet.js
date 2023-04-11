import { SAVE_WALLET } from '../actions';

const INITIAL_STATE = {
  expenseList: 0,
  cambio: 'BRL',
};

const WalletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET: {
    return {
      ...state,
      expenseList: action.payload.expenseList,
      cambio: action.payload.cambio,
    };
  }
  default:
    return state;
  }
};

export default WalletReducer;
