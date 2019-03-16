import React, { Component } from 'react';
import axios from 'axios';
import PatientTable from './PatientTable';

export default class ViewPatient extends Component {

  constructor(props) {
      super(props);
      this.state = {patient: []};
    }
    componentDidMount(){
      axios.get('http://localhost:4000/patient')
        .then(response => {
          this.setState({patient : response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.patient.map(function(object, i){
          return <PatientTable obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Patient List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Person</th>
                <th>Age</th>
                <th>Phone Number</th>
                <th>Email</th>
                
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }