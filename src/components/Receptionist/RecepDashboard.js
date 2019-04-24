
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddPatient from './AddPatient'
import ViewPatient from '../common/ViewPatients';
import Appointment from './ViewAppoint'
import { logoutUser } from "../../actions/authActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from './AppBar'



class RecepDashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
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

   
    return (
      <div className="App">
<AppBar/>
        <aside className="main-sidebar" style={{ position: "absolute" }}>
          <section className="sidebar" style={{ position: "absolute" }}>
            <div className="user-panel">
              <div className="pull-left image">
                <img src="images/admin.jpg" className="img-circle" alt="User Image" />
              </div>
              <div className="pull-left info">
                <p>Alexander Pierce</p>
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
              <ListItem button onClick={this.updatePatientAdd}>
                  <ListItemText primary="New Patient" />
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