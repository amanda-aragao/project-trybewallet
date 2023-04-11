// Coloque aqui suas actions
export const SAVE_LOGIN = 'SAVE_LOGIN';
export const saveLogin = (email, password) => ({
  type: SAVE_LOGIN,
  payload: { email, password },
});
