import React, { Component } from 'react';

class RecepTable extends Component {
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
            {this.props.obj.dob}
          </td>
          <td>
            {this.props.obj.phn_number}
          </td>
          
        </tr>
    );
  }
}

export default RecepTable;