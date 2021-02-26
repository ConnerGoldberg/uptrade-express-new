import React from 'react';
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import Customers from '../components/customers/customers';
import Welcome from '../views/Welcome';
import Login from '../views/authentication/login/login';
import Register from '../views/authentication/signup/register';
import WelcomeClient from '../views/clients/Welcome';
import WelcomeContractor from '../views/contractors/Welcome';
import UpgradePremium from '../views/sales/Upgrade/Upgrade';
import Checkout from '../views/sales/Checkout/Checkout';

const Pages = () => {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  console.log('isAuthenticated', isAuthenticated);

  return isAuthenticated ? (
    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/contractors/home" component={WelcomeContractor} />
      <Route path="/clients/home" component={WelcomeClient} />
      <Route path="/customers" component={Customers} />
      <Route path="/upgrade" component={UpgradePremium} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Register} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Register} />
      <Route path="/customers" component={Customers} />
      {/* <Route path="/forgot-password">
                <Switch>
                    <Route path="/forgot-password" exact component={ForgotPassword} />
                    <Route path="/forgot-password/:token" exact component={ResetPasswordContainer} />
                    <Route component={ForgotPassword} />
                </Switch>
            </Route> */}
    </Switch>
  );
};

export default Pages;
