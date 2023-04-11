// Coloque aqui suas actions
export const SAVE_LOGIN = 'SAVE_LOGIN';
export const saveLogin = (email) => ({
  type: SAVE_LOGIN,
  payload: { email },
});

export const SAVE_WALLET = 'SAVE_WALLET';
export const saveWallet = (expenseList, cambio) => ({
  type: SAVE_WALLET,
  payload: { expenseList, cambio },
});
