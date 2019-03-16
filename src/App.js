import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddPatient from './components/AddPatient'
import ViewPatient from './components/ViewPatients'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Nawodya</Link>
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

export default App;
