import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


export default class ViewDoctors extends Component {

  constructor(props) {
    super(props);
    this.state = { doctor: [] };
    this.delete = this.delete.bind(this);
  }

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
        axios.get('http://localhost:4000/api/doctor/delete/' + this.props.item._id)

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
    axios.get('http://localhost:4000/api/doctor/view')
      .then(response => {
        this.setState({ doctor: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  
  // tabRow(){
  //   return this.state.doctor.map(function(object, i){
  //       return( obj={object} ,key={i});
  //   });
  // }

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
              <th>Specialist</th>
              <th>Phone Number</th>
            </tr>

          </thead>
          <tbody>
            {this.state.doctor.map(function (item, key) {
              
              return (
                <tr key={key}>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td>{item.specialist}</td>
                  <td>{item.phn_number}</td>

                  <td>
                    <Link to={"/edit/" + item._id} className="btn btn-primary">Edit</Link>
                  </td>
                  <td>
                    <button onClick={()=>this.delete} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              )
            })}


          </tbody>
        </table>
      </div>
    );
  }
}