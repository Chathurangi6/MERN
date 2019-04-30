
import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import ReportUpload from "../src/components/Lab/Report/ReportUpload"
import Login from "./components/auth/Login";
import Admin from './components/Admin/Admin.js';
import PrivateRoute from "./components/private-route/privateRoute";
import RecepDashboard from "./components/Receptionist/RecepDashboard";
import { Provider } from "react-redux";
import store from "./store";
import Profile from "./components/Doctor/Profile";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import DocDashboard from "./components/Doctor/DocDashboard"
import AdminDashboard from "./components/Admin/Admin"
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Home from '../src/components/layout/Home';



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>  

        <Router>
          <div className="App">
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/doctordashboard" component={DocDashboard} />
            <Route exact path="/receptionistdashboard" component={RecepDashboard} />
            {
            <Route exact path="/patient/view" component={ViewPatient} />
            <Route exact path="/doctor/add" component={addDoctor} />
            <Route exact path="/appoint" component={AddAppoint} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/patient/add" component={AddPatient} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/h" component={Home} />
            <Route exact path="/recep" component={RecepDashboard} />
            <Route path="/reset/:token" component={ResetPassword} />
         }

      <Router>
        <div >
         
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/report" component={ReportUpload} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/" component={Home} />
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