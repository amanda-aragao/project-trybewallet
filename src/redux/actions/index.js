import fetchCurrencies from '../../utils/fetchCurrencies';

export const SAVE_LOGIN = 'SAVE_LOGIN';
export const SAVE_WALLET = 'SAVE_WALLET';
export const FETCH_CURRENCIES_REQUEST = 'FETCH_CURRENCIES_REQUEST';
export const FETCH_CURRENCIES_SUCCES = 'FETCH_CURRENCIES_SUCCES';
export const FETCH_CURRENCIES_FAILED = 'FETCH_CURRENCIES_FAILED,';
export const REMOVE_KEYOPTION_USDT_API = 'REMOVE_KEYOPTION_USDT_API';
export const EXPENSES_ACTION = 'EXPENSES_ACTION';

export const saveLogin = (email) => ({
  type: SAVE_LOGIN,
  payload: { email },
});

export const saveWallet = (idToEdit, cambio) => ({
  type: SAVE_WALLET,
  payload: { idToEdit, cambio },
});

export const fetchRequest = () => ({
  type: FETCH_CURRENCIES_REQUEST,
});

export const fetchRequestSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCES,
  payload: {
    currencies,
  },
});

export const fetchRequestFailed = (errorMessage) => ({
  type: FETCH_CURRENCIES_FAILED,
  package: {
    errorMessage,
  },
});

export const ExpensesAction = (expenses) => ({
  type: EXPENSES_ACTION,
  payload: {
    expenses,
  },
});

export const removeKeyToApi = (name) => ({
  type: REMOVE_KEYOPTION_USDT_API,
  payload: {
    name,
  },
});

export const fetchRequestThunk = () => async (dispatch) => {
  try {
    dispatch(fetchRequest());
    const returnApi = await fetchCurrencies();
    dispatch(fetchRequestSuccess(returnApi));
    dispatch(removeKeyToApi());
  } catch (error) {
    console.log('error', error);
    dispatch(fetchRequestFailed('Algo deu errado'));
  }
};

export const fetchExpensesThunk = (expense) => async (dispatch) => {
  try {
    const returnApi = await fetchCurrencies();

    const expenseArrayValues = {
      ...expense,
      exchangeRates: returnApi,
    };
    dispatch(ExpensesAction(expenseArrayValues));
  } catch (error) {
    console.log('error', error);
    dispatch(fetchRequestFailed('Algo deu errado'));
  }
};
