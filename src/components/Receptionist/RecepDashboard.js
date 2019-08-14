
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
import MenuIcon from '@material-ui/icons/Menu';
import DocAvailability from "./DocAvailability";


class RecepDashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      docAvail:true,
      patientView: false,
      patientadd: false,
      appointment: false,
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  docAvailable=()=>{
    this.setState({
      patientView: false,
      patientadd: false,
      appointment: false,
      docAvail:true
    })
  };
  updateView = () => {
    this.setState({
      patientView: true,
      patientadd: false,
      appointment: false,
      docAvail:false

    })
  }
  updatePatientAdd = () => {
    this.setState({
      patientView: false,
      patientadd: true,
      appointment: false,
      docAvail:false
    })
  }
  updateAppoint = () => {
    this.setState({
      patientView: false,
      patientadd: false,
      appointment: true,
      docAvail:false
    })
  }

  render() {

    const { user } = this.props.auth;
  // console.log(user);
    return (
      <div className  ='container-fluid'>
        <div className='row'>  
          <div className='col-md-2'>
            <div className='row'>
           
            </div>
            
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
              <ListItem button onClick={this.docAvailable}>
              <span>Doctor Availability</span>
                </ListItem>
                </List>
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
        </div>
        <div className='col-md-10' style={{paddingLeft:"0px"}}>
            <header className="main-header"> {/*className="main-header*/}
                       
                {/*<DateAndTime/>*/}        
              <nav className="navbar navbar-static-top logoutnav" style={{width:"100%"}} >       
                <div className='logoutdiv tc' style={{marginLeft:"auto", marginRight:"0"}} >
                <Button className="logoutbutton grow shadow-5" color='danger' onClick={this.onLogoutClick} >Logout</Button>
                </div>
              </nav>
            </header>
        {this.state.docAvail && (<DocAvailability/>)}
        {this.state.patientView && (<ViewPatient />)}
        {this.state.patientadd && (<AddPatient />)}
        {this.state.appointment && (<Appointment />)}
</div>
      </div>
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