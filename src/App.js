
import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import PrivateRoute from "./components/private-route/privateRoute";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./store";


class App extends Component {
  render() {
    return (
      <Provider store={store}>  
      <Router>
        <div className="App">
          
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
      </Router>
      </Provider> 
    );
  }
}
export default App;