import { SAVE_LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
};

const UserReducer = (state = INITIAL_STATE, action) => {
//   const { type , payload } = action;
  switch (action.type) {
  case SAVE_LOGIN: {
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
    };
  }
  default:
    return state;
  }
};
export default UserReducer;
