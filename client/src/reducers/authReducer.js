import { AUTHENTICATE, UNAUTHENTICATE } from '../actions/auth/types';

const initialState = {
  user: undefined,
  isAuthenticated: undefined,
};

export default function authReducer(state = initialState, action) {
  console.log('action', action.type);
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };
    case UNAUTHENTICATE:
      return {
        user: undefined,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
