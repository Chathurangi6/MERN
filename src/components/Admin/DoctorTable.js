import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Swal from 'sweetalert2'

class DoctorTable extends Component {
  constructor(props) {
    super(props);
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
        axios.get('http://localhost:4000/api/doctor/delete/' + this.props.obj._id)

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        
      }
    })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <tr>
        <td>
          {this.props.obj.fname}
        </td>
        <td>
          {this.props.obj.lname}
        </td>
        <td>
          {this.props.obj.email}
        </td>
        <td>
          {this.props.obj.specialist}
        </td>
        <td>
          {this.props.obj.phn_number}
        </td>
        <td>
          <Link to={"/edit/" + this.props.obj._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </td>

      </tr>
    );
  }
}

export default DoctorTable;