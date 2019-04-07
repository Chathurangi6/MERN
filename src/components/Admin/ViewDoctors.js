import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import DoctorTable from "./DoctorTable"


export default class ViewDoctors extends Component {

  constructor(props) {
    super(props);
    this.state = { doctor: [] };
    this.delete = this.delete.bind(this);
    this.fetchData=this.fetchData.bind(this);
  }

  fetchData(){
    axios.get('http://localhost:4000/api/doctor/view')
    .then(response => {
      this.setState({ doctor: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  };
  

  delete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        axios.get('http://localhost:4000/api/doctor/delete/' + this.props.obj._id)
        this.fetchData();
        Swal.fire( 
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )   
      }
      
    })
      .catch(err => console.log(err))
  }

  
  componentDidMount() {
   this.fetchData();
  }

  
  tabRow(){
    return this.state.doctor.map(function(object, i){
        return(<DoctorTable obj={object} key={i}/>);
    });
  }

  render() {
    return (

      <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "white", padding: '10px', marginTop: '20px', width: "900px" }}>
        <h3 align="center">Doctor List</h3>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Speciality</th>
              <th>Phone Number</th>
              <th>Action</th>
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