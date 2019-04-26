
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddPatient from './AddPatient'
import ViewPatient from '../common/ViewPatients';
import Appointment from './ViewAppoint'
import { logoutUser } from "../../actions/authActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'


// import Welcome from './Welcome'


class RecepDashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      Welcome:true,
      patientView: false,
      patientadd: false,
      appointment: false,
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  updateView = () => {
    this.setState({
      patientView: true,
      patientadd: false,
      appointment: false,
      Welcome:false

    })
  }
  updatePatientAdd = () => {
    this.setState({
      patientView: false,
      patientadd: true,
      appointment: false,
      Welcome:false
    })
  }
  updateAppoint = () => {
    this.setState({
      patientView: false,
      patientadd: false,
      appointment: true,
      Welcome:false
    })
  }

  render() {

    const { user } = this.props.auth;
  // console.log(user);
    return (
      <div className="App">
      <header className="main-header">
          <a href="" className="logo">
            <span className="logo-lg"><b>Receptionist</b>Nawodaya</span>
          </a>
          <nav className="navbar navbar-static-top">
          <Toolbar>
          <IconButton  color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" >
            News
          </Typography>
          <Button color="inherit" className="top-right" onClick={this.onLogoutClick}>Logout</Button>
        </Toolbar>
          </nav>
        </header>
        <aside className="main-sidebar" >
          <section className="sidebar" >
            <div className="user-panel">
              <div className="pull-left image">
                <img src="images/admin.jpg" className="img-circle" alt="User Image" />
              </div>
              <div className="pull-left info">
                <p>{user.fname}</p>
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
              <List component="nav" style={{backgroundColor:"#212f39"}}>
              <ListItem button onClick={this.updatePatientAdd}>
              <span>New Patient</span>
                </ListItem>
                </List>
                <List component="nav" style={{backgroundColor:"#212f39"}}>
                <ListItem button onClick={this.updateView}>
                  <span>View Patient</span>
                </ListItem>
                </List>
                <List component="nav" style={{backgroundColor:"#212f39"}}>
                <ListItem button onClick={this.updateAppoint}>
                  <span>Appointments</span>
                </ListItem>
              </List>

            </ul>
          
          </section>


        </aside>
        {/* {this.state.Welcome && (<Welcome/>)} */}
        {this.state.patientView && (<ViewPatient />)}
        {this.state.patientadd && (<AddPatient />)}
        {this.state.appointment && (<Appointment />)}


      </div>

    );
  }
}
RecepDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(RecepDashboard);