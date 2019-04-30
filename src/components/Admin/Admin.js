import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RegReceptionist from './RegReceptionist'
import * as ReactBootstrap from 'react-bootstrap';
import ViewPatient from '../common/ViewPatients';
import ViewDoctors from './ViewDoctors';
import RegDoctor from './RegDoctor';
import ViewRecep from "./ViewRecep";
import { logoutUser } from "../../actions/authActions"
import Dashboard from "../Admin/Dashboard"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


class Admin extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      openPatient: false,
      openDoctor: false,
      openRecep: false,
      patientView: false,
      regDoctor: false,
      doctorView: false,
      regReceptionist: false,
      recepView: false,
      main:true

    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  dashboard = () => {
    this.setState({
      patientView: false,
      regDoctor: false,
      doctorView: false,
      recepView: false,
      regReceptionist: false,
      main:true
    })
  }
  updateView = () => {
    this.setState({
      patientView: true,
      regDoctor: false,
      doctorView: false,
      recepView: false,
      regReceptionist: false,
      main:false
    })
  }
  updateRegDoc = () => {
    this.setState({
      regDoctor: true,
      patientView: false,
      doctorView: false,
      regReceptionist: false,
      recepView: false,
      main:false
    })
  }
  updateViewDoc = () => {
    this.setState({
      regDoctor: false,
      patientView: false,
      doctorView: true,
      regReceptionist: false,
      recepView: false,
      main:false
    })
  }
  updateRegRecep = () => {
    this.setState({
      regDoctor: false,
      patientView: false,
      doctorView: false,
      regReceptionist: true,
      recepView: false,
      main:false
    })
  }
  updateViewRecep = () => {
    this.setState({
      regDoctor: false,
      patientView: false,
      doctorView: false,
      regReceptionist: false,
      recepView: true,
      main:false
    })
  }


  render() {
    const { openPatient } = this.state;
    const { openRecep } = this.state;
    const { openDoctor } = this.state;
    const { user } = this.props.auth;
    console.log(user)
    const buttonstyle = {
       backgroundColor: "grey", color: "white",padding:"5px",width:"200px"
    };

    return (
     
      <div>
        {/* header */}

        <header className="main-header">
          <a href="" className="logo">
            <span className="logo-lg"><b>Admin</b>Nawodaya</span>
          </a>
          <nav className="navbar navbar-static-top">
            <a href="" className="sidebar-toggle" data-toggle="push-menu" role="button">
              <span className="sr-only">Toggle navigation</span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <ReactBootstrap.Button onClick={this.onLogoutClick} className="navbar-brand" style={{ color: "white" }}>Logout</ReactBootstrap.Button>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <aside className="main-sidebar" >
          <section className="sidebar">
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

              <li className="treeview">
                <List component="nav"  style={{backgroundColor:"#212f39"}}>
              <ListItem button onClick={this.dashboard}  >
                  <i className="fa fa-calendar"></i>
                  <span>Dashboard</span>
                </ListItem>
                </List>
                </li>
              <li className="treeview"  style={{backgroundColor:"#212f39"}}>
                <a href="#" onClick={() => this.setState({ openPatient: !openPatient })}
                  aria-controls="example-collapse-text"
                  aria-expanded={openPatient}>
                  <i className="fa fa-files-o"></i>
                  <span>Patients</span>
                </a>
                <ReactBootstrap.Collapse in={this.state.openPatient}>
                  <div id="example-collapse-text">
                    <li>
                      <button style={buttonstyle} onClick={this.updateView}>View</button>
                    </li>
                  </div>
                </ReactBootstrap.Collapse>
              </li>

              <li className="treeview"  style={{backgroundColor:"#212f39"}}>
                <a href="#" onClick={() => this.setState({ openDoctor: !openDoctor })}
                  aria-controls="example-collapse-text"
                  aria-expanded={openDoctor}>
                  <i className="fa fa-files-o"></i>
                  <span>Doctors</span>
                </a>
                <ReactBootstrap.Collapse in={this.state.openDoctor}>
                  <div id="example-collapse-text">
                    <li>
                      <button style={buttonstyle} onClick={this.updateRegDoc}><i className="fa fa-circle-o" ></i>Register</button>
                    </li>
                    <li><button style={buttonstyle} onClick={this.updateViewDoc}><i className="fa fa-circle-o"></i> View</button></li>

                  </div>
                </ReactBootstrap.Collapse>
              </li>

              <li className="treeview"  style={{backgroundColor:"#212f39"}}>
                <a href="#" onClick={() => this.setState({ openRecep: !openRecep })} aria-controls="example-collapse-text"
                  aria-expanded={openRecep}>
                  <i className="fa fa-pie-chart"></i>
                  <span>Receptionists</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ReactBootstrap.Collapse in={this.state.openRecep}>
                  <div id="example-collapse-text">
                    <li><button style={buttonstyle} onClick={this.updateRegRecep}><i className="fa fa-circle-o" ></i>Register</button></li>
                    <li><button style={buttonstyle} onClick={this.updateViewRecep}><i className="fa fa-circle-o"></i> View</button></li>

                  </div>
                </ReactBootstrap.Collapse>
              </li>
              
              <li style={{backgroundColor:"#212f39"}}>
                <a href="pages/calendar.html">
                  <i className="fa fa-calendar"></i> Laboratorian<span></span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-red">3</small>
                    <small className="label pull-right bg-blue">17</small>
                  </span>
                </a>
              </li>



            </ul>
          </section>


        </aside>
        {this.state.main && (<Dashboard/>)}
        {this.state.patientView && (<ViewPatient /> )}
        {this.state.regDoctor && (<RegDoctor />)}
        {this.state.doctorView && (<ViewDoctors />)}
        {this.state.regReceptionist && (<RegReceptionist />)}
        {this.state.recepView && (<ViewRecep />)}

       

     
        </div>
    );
  }
}
Admin.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Admin);