import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import authRoutes from '../routes/authroutes.jsx';
import Header from '../components/header/header';

export default class BlankLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loadingLoginStatus: true,
          profileData: {
            email: "",
            id: "",
            roles: "",
            status: "",
          },
          module: "login",
          profileDetail: {},
          userInfo: {},
          isNavOpen: false,
          width: window.innerWidth,
          settings: [
            {
              theme: "light",
              layout: "vertical",
              dir: "ltr",
              sidebarpos: "fixed",
              headerpos: "fixed",
              boxed: "full",
              navbarbg: "primaryColor",
              sidebarbg: "primaryColor",
              logobg: "primaryColor",
            },
          ],
        };
      }
    render() {
        return (
            <div className="authentications">
                  <Header
          data={this.state}
          history={this.props.history}
          settings={this.state.settings}
          module={this.state.module}
        />
                {console.log(authRoutes)}
                    <Switch>
                        {authRoutes.map((prop, key) => {
                            if (prop.redirect)
                                return (
                                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                                );
                            return (
                                <Route path={prop.path} component={prop.component}  key={key} />
                            );
                        })}
                    </Switch>
            </div>
        )
    }
}
