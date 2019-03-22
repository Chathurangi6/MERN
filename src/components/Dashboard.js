import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddPatient from './AddPatient'
import ViewPatient from './ViewPatients'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
   
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={'/'} className="navbar-brand">Nawodaya</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/view'} className="nav-link">View</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/appoint'} className="nav-link">Appointments</Link>
                </li>
                <li className="nav-item">
                 <Link  onClick={this.onLogoutClick} className="nav-link" >Logout</Link>
                </li>
                <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
                </ul>
            </div>
          </nav> <br/>
          <h2>Welcome to Nawodaya Hospital</h2> <br/>
          <Switch>
              <Route exact path='/create' component={ AddPatient } />
              
              <Route path='/view' component={ ViewPatient } />
          </Switch>
        </div>
      </Router>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);