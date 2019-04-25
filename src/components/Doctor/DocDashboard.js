
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '../Receptionist/AppBar'
import Profile from '../Doctor/Profile'

class DocDashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      profile: true,
      
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  updateProfile = () => {
    this.setState({
      profile: true,
      patientadd: false,
      appointment: false,

    })
  }
  updatePatientAdd = () => {
    this.setState({
      patientView: false,
      patientadd: true,
      appointment: false,
    })
  }
  updateAppoint = () => {
    this.setState({
      patientView: false,
      patientadd: false,
      appointment: true,
    })
  }

  render() {
    const { user } = this.props.auth;
   
    return (
      <div className="App">
<AppBar/>
        <aside className="main-sidebar" >
          <section className="sidebar" >
            <div className="user-panel">
              <div className="pull-left image">
                <img src="images/admin.jpg" className="img-circle" alt="User Image" />
              </div>
              <div className="pull-left info">
                <p>{user.email}</p>
                <a href=""><i className="fa fa-circle text-success"></i> Online</a>
              </div>
            </div>
            <form action="#" method="get" className="sidebar-form">
              <div className="input-group">
                <input type="text" name="q" className="form-control" placeholder="Search..." />
                <span className="input-group-btn">
                  <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </form>
            <ul className="sidebar-menu">
              <li className="header">MAIN NAVIGATION</li>
              <List component="nav" style={{backgroundColor:"#2F4F4F"}}>
              <ListItem button onClick={this.updateProfile}>
                  <ListItemText primary="Profile" />
                </ListItem>
                </List>
                <List component="nav" style={{backgroundColor:"#2F4F4F"}}>
                <ListItem button onClick={this.updateView}>
                  <ListItemText primary="View Patient" />
                </ListItem>
                </List>
                <List component="nav" style={{backgroundColor:"#2F4F4F"}}>
                <ListItem button onClick={this.updateAppoint}>
                  <ListItemText primary="Appointments" />
                </ListItem>
              </List>

            </ul>
          </section>
        </aside>
        <div>
          {user.email}
        {this.state.profile && (<Profile/>)}
        </div>
        

      </div>

    );
  }
}
DocDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(DocDashboard);