import React, { Component } from 'react';

class PatientTable extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.age}
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