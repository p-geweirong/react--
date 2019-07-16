import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/Index";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/index" component={Index} />
            {/* <Redirect to="/" /> */}
            {/* 重定向 */}
          </Switch>
        </Router>
      </div>
    );
  }
}
