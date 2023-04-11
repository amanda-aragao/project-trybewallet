import { SAVE_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN: {
    return {
      ...state,
      email: action.payload.email,
    };
  }
  default:
    return state;
  }
};
export default UserReducer;
