import React from "react";
import ReactDOM from "react-dom";
import { indexRoutes } from "./routes/index.jsx";
import "./index.css";
import { Route, Router, Switch } from "react-router-dom";
import history from "./history";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        console.log("prop", prop, key);
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
