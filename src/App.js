
import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Admin from './components/Admin/Admin.js';
import PrivateRoute from "./components/private-route/privateRoute";
import RecepDashboard from "./components/Receptionist/RecepDashboard";
import { Provider } from "react-redux";
import store from "./store";
import ViewPatient from "./components/common/ViewPatients";
import addDoctor from "./components/Doctor/AddDoctor"
import AddPatient from "./components/AddPatient";
import DocDashboard from "./components/Doctor/DocDashboard"



class App extends Component {
  render() {
    return (
      <Provider store={store}>  
      <Router>
        <div className="App">
          <Route exact path="/patient/view" component={ViewPatient} />
          <Route exact path="/doctor/add" component={addDoctor} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/patient/add" component={AddPatient} />
          
            <Switch>
              <PrivateRoute exact path="/doctor/dashboard" component={DocDashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/recep/dashboard" component={RecepDashboard} />
            </Switch>
        </div>
      </Router>
      </Provider> 
    );
  }
}
export default App;