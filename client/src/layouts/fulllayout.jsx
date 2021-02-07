import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../components/header/header.jsx";
import ThemeRoutes from "../routes/routing.jsx";
import Loading from "../views/recycle-components/Loading.jsx";
import Customers from "../components/customers/customers";

class FullLayout extends Component {
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
      module: "signup",
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

  componentDidMount() {
    //TODO: ON MOUNT CHECK IF THE USER IS LOGGED IN AND REDIRECT TO history.push("/authentication/login")
  }
  render() {
    return (
      <div className="App">
        {/*--------------------------------------------------------------------------------*/}
        {/* Header                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Header
          data={this.state}
          history={this.props.history}
          settings={this.state.settings}
          module={this.state.module}
        />
        <Customers></Customers>
        <Suspense fallback={<Loading />}>
          <Switch>
            {ThemeRoutes.map((prop, key) => {
              // User can only use questionnaire if their status is 'INITIAL'
              if (
                this.state.profileData &&
                this.state.profileData.status.toLowerCase() === "initial"
              ) {
                return (
                  prop.name === "Welcome" && (
                    <Route
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  )
                );
              } else {
                if (prop.collapse) {
                  return prop.child.map((prop2, key2) => {
                    return (
                      <Route
                        path={prop2.path}
                        component={prop2.component}
                        key={key2}
                      />
                    );
                  });
                } else if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                } else {
                  return (
                    <Route
                      path={prop.path}
                      exact={prop.exact}
                      component={() => <prop.component />}
                      key={key}
                    />
                  );
                }
              }
            })}
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default FullLayout;
