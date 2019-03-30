import React, { Component } from 'react';
import axios from 'axios';
import DoctorTable from './DoctorTable';
export default class ViewDoctors extends Component {

  constructor(props) {
      super(props);
      this.state = {doctor: []};
    }
    componentDidMount(){
      axios.get('http://localhost:4000/api/doctor')
        .then(response => {
          this.setState({doctor : response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.doctor.map(function(object, i){
          return <DoctorTable obj={object} key={i} />;
      });
    }

    render() {
      return (
        
        <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
          <h3 align="center">Doctor List</h3>
          
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Specialist</th>
                <th>Phone Number</th>    
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