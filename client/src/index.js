import React from "react";
import ReactDOM from "react-dom";
import Pages from "./routing/pages";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import history from "./history";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <Router history={history}>
    <Route component={Pages}></Route>
  </Router>,
  document.getElementById("root")
);
