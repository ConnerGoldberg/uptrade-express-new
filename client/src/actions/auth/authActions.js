import api from '../../lib/api';

export function authenticate(user) {
  return {
    type: 'AUTHENTICATE',
    user,
  };
}

export function unauthenticate() {
  return {
    type: 'UNAUTHENTICATE',
    user: undefined,
  };
}

export function logIn(credentials) {
  return async (dispatch) => {
    const user = await api.login(credentials);
    console.log('user', user);
    return user ? dispatch(authenticate(user)) : dispatch(unauthenticate());
  };
}

export function logOut(user) {
  console.log('logging out', user);
  return async (dispatch) => {
    try {
      await api.logout(user);
    } catch (error) {
      console.error('Error attempting to logout', error);
    }

    return dispatch(unauthenticate());
  };
}

export function checkAuthentication() {
  return async (dispatch) => {
    try {
      const user = await api.getLoggedInUser();
      console.log('user', user);
      if (user) {
        return dispatch(authenticate(user));
      }
    } catch (error) {
      console.error(error);
    }
    window.localStorage.removeItem('user');
    return dispatch(unauthenticate());
  };
}
