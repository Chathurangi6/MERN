import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
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
        <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
          <h3 align="center">Patient List</h3>
          
          <Table className="striped" style={{ marginTop: 20 }}>
          
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Phone Number</th>
                <th>Email</th>  
              </tr>
            </thead>
            
            <tbody>
              { this.tabRow() }
            </tbody>
          
          </Table>
        </div>
      );
    }
  }