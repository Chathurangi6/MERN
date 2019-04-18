
import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import AddAppoint from "../src/components/Receptionist/ViewAppoint"
import Login from "./components/auth/Login";
import Admin from './components/Admin/Admin.js';
import PrivateRoute from "./components/private-route/privateRoute";
import RecepDashboard from "./components/Receptionist/RecepDashboard";
import { Provider } from "react-redux";
import store from "./store";
import ViewPatient from "./components/common/ViewPatients";
import addDoctor from "./components/Doctor/AddDoctor"
import AddPatient from "./components/Receptionist/AddPatient";
import DocDashboard from "./components/Doctor/DocDashboard"
import AdminDashboard from "./components/Admin/Admin"
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Home from '../src/components/layout/Home'

class App extends Component {
  render() {
    return (
      <Provider store={store}>  
      <Router>
        <div className="App">
          <Route exact path="/patient/view" component={ViewPatient} />
          <Route exact path="/doctor/add" component={addDoctor} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/appoint" component={AddAppoint} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/patient/add" component={AddPatient} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/h" component={Home} />
          <Route exact path="/recep" component={RecepDashboard} />
         <Route path="/reset/:token" component={ResetPassword} />

            <Switch>
              <PrivateRoute exact path="/doctor/dashboard" component={DocDashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/recep/dashboard" component={RecepDashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/admin/dashboard" component={AdminDashboard} />
            </Switch>
        </div>
      </Router>
      </Provider> 
    );
  }
}
export default App;