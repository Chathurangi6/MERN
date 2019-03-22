import React, { Component } from 'react';

class PatientTable extends Component {
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
            {this.props.obj.dob}
          </td>
          <td>
            {this.props.obj.phn_number}
          </td>
          <td>
            {this.props.obj.email}
          </td>
          
        </tr>
    );
  }
}

export default PatientTable;