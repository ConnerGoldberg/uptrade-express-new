import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Router as BrowserRouter } from 'react-router-dom';
import { checkAuthentication } from './actions/auth/authActions';
import history from './lib/history';
import Pages from './routing/pages';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const checkAuthenticationConnect = useCallback(() => dispatch(checkAuthentication()), [dispatch]);

  useEffect(() => {
    checkAuthenticationConnect();
  }, [checkAuthenticationConnect]);

  const app =
    isAuthenticated !== null ? (
      <BrowserRouter history={history}>
        <Route component={Pages} />
      </BrowserRouter>
    ) : null;

  return <div className="App">{app}</div>;
};

export default App;
