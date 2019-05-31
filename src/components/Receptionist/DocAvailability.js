import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DocAvailability extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
              <h3>Add New Patient</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>First Name:  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.fname}
                        onChange={this.onChangeFName}
                        />
                  </div>
                  <div className="form-group">
                      <label>Last Name:  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.lname}
                        onChange={this.onChangeLName}
                        />
                  </div>
                  <div className="form-group">
                      <label>Date of Birth: </label>
                      <input type="date" 
                        className="form-control"
                        value={this.state.dob}
                        onChange={this.onChangeDOB}
                        />
                  </div>
                  <div className="form-group">
                      <label>Phone Number: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.phn_number}
                        onChange={this.onChangePhnNumber}
                        />
                  </div>
                  <div className="form-group">
                      <label>Email: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Register" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
        )
}
}
export default DocAvailability;