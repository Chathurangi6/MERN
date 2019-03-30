import React, { Component } from 'react';

class DoctorTable extends Component {
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
          
        </tr>
    );
  }
}

export default DoctorTable;