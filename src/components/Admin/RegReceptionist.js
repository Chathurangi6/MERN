import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerReceptionist } from "../../actions/authActions";
import classnames from "classnames";
class RegReceptionist extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname:"",
      email: "",
      dob:"",
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
      dob:this.state.dob,
      email: this.state.email,
      phn_number:this.state.phn_number,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerReceptionist(newUser, this.props.history); 
   this.setState({
    fname: "",
    lname:"",
    email: "",
    dob:"",
    phn_number:"",
    password: "",
    password2: ""
   })
  };
  
render() {
    const { errors } = this.state;
return (
      <div className="container center br5 shadow-2 ba b--black-10" 
      style={{
        backgroundColor:"rgba(0,0,0,0)",
        padding:'10px',
        backgroundColor:"rgba(255,255,255,0.540756285424326)",
        marginTop:'20px',
        width:"69%",
        marginBottom:"30px",
        overflow:'hidden'
        }}>
        <div className="">
            <div className="col s8 offset-s2" style={{paddingLeft:"20px", paddingRight:"20px"}} >
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4 style={{fontFamily:"Acme"}}>
                  Receptionist Registration
                </h4>
            </div>
            <form noValidate id="myForm" onSubmit={this.onSubmit}>
              <div className="input-field col s12" style={{width:"50%", display:"inline-block"}}>
                <input
                  onChange={this.onChange}
                  value={this.state.fname}
                  error={errors.fname}
                  id="fname"
                  type="text"
                  required
                  className={classnames("", {
                    invalid: errors.fname
                  })}
                />
                <label htmlFor="name">First Name</label>
                <span className="red-text">{errors.fname}</span>
              </div>
              <div className="input-field col s12" style={{width:"50%", display:"inline-block"}}>
                <input
                  onChange={this.onChange}
                  value={this.state.lname}
                  error={errors.lname}
                  id="lname"
                  type="text"
                  required
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
                  required
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
 
              </div>
              <div className="input-field col s12" style={{marginTop:"20px", marginBottom:"15"}}>
              <div style={{width:"240px"}} >
                    <label htmlFor="specialist" style={{display:"inline-block", fontSize:"15px", float:"left", marginTop:"15px"}} >Date of Birth</label>
                <input
                 style={{display:"inline-block", width:"125px", left:""}}
                  onChange={this.onChange}
                  value={this.state.dob}
                  error={errors.dob}
                  id="dob"
                  type="Date"
                  required
                  className={classnames("", {
                    invalid: errors.dob
                  })}
                />
                
                <span className="red-text">{errors.dob}</span>
 </div>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.phn_number}
                  error={errors.phn_number}
                  id="phn_number"
                  type="text"
                  required
                  className={classnames("", {
                    invalid: errors.phn_number
                  })}
                />
                <label htmlFor="phn_number">Phone Number</label>
                <span className="red-text">{errors.phn_number}</span>
 
              </div>

              <div className="input-field col s12" style={{width:"50%" , display:"inline-block"}} >
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  required
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12" style={{width:"50%", display:"inline-block"}}>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  required
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px", height:"100px"}}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    float:"left"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
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
RegReceptionist.propTypes = {
    registerReceptionist: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerReceptionist }
)(withRouter(RegReceptionist));