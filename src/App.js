import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPatient from './components/AddPatient'

class App extends Component {
  render() {
    return (
      <div>
        <AddPatient/>
      </div>
    );
  }
}

export default App;
