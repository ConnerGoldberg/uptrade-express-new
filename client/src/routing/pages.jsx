import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Customers from '../components/customers/customers';
import Welcome from '../views/Welcome';
import Login from '../views/authentication/login/login';
import Register from '../views/authentication/signup/register';

class Pages extends React.Component {   

    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,       
      };
    }

  render() {    

    return this.state.isAuthenticated ? (
        <Switch>
            <Route path="/" exact component={Welcome} />
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
}
}

export default Pages;
