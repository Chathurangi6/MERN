import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerDoctor } from "../../actions/authActions";
import classnames from "classnames";
class RegDoctor extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname:"",
      email: "",
      specialist: "",
      phn_number:"",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newUser = {
      fname: this.state.fname,
      lname: this.state.lname,
      specialist:this.state.specialist,
      email: this.state.email,
      phn_number:this.state.phn_number,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerDoctor(newUser, this.props.history);  
    this.setState({
      fname: "",
      lname:"",
      email: "",
      specialist: "",
      phn_number:"",
      password: "",
      password2: ""
    })
  };
  
render() {
    const { errors } = this.state;
return (
      <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
            </div>
            <form noValidate id="myForm" onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.fname}
                  error={errors.fname}
                  id="fname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.fname
                  })}
                />
                <label htmlFor="fname">First Name</label>
                <span className="red-text">{errors.fname}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lname}
                  error={errors.lname}
                  id="lname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lname
                  })}
                />
                <label htmlFor="lname">Last Name</label>
                <span className="red-text">{errors.lname}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
 
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.specialist}
                  error={errors.specialist}
                  id="specialist"
                  type="text"
                  className={classnames("", {
                    invalid: errors.specialist
                  })}
                />
                <label htmlFor="specialist">Specialist</label>
                <span className="red-text">{errors.specialist}</span>
 
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.phn_number}
                  error={errors.phn_number}
                  id="phn_number"
                  type="text"
                  className={classnames("", {
                    invalid: errors.phn_number
                  })}
                />
                <label htmlFor="phn_number">Phone Number</label>
                <span className="red-text">{errors.phn_number}</span>
 
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Register
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
RegDoctor.propTypes = {
  registerDoctor: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerDoctor }
)(withRouter(RegDoctor));