import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import '../../css/login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }


  // push user to dashboard when they login
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if(nextProps.auth.user.userRoll === "R"){
        this.props.history.push("/recep/dashboard");
      }
      else if(nextProps.auth.user.userRoll === "D"){
        this.props.history.push("/doctor/dashboard");
      }
      else if(nextProps.auth.user.userRoll === "A"){
        this.props.history.push("/admin/dashboard");
      }
    }
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };
  

  render() {
    const { errors } = this.state;
    
    return (
      <div className="content">
      <div className="login-content">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 ">

            <div className="topic col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "142px", marginTop:"20px", marginBottom:"5px" }}>
                <button
                 
                  type="submit"
                  className="btn   waves-light hoverable accent-3"
                >
                  Login
                </button>
              </div>
              <a href='/forgotpassword' style={{ paddingLeft: "102px" }}>forgot your password?</a> 
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { loginUser }
)(Login);