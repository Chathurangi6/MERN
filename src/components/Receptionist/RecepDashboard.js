
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Footer from '../layout/Footer';
import AddPatient from './AddPatient'
import * as ReactBootstrap from 'react-bootstrap';
import ViewPatient from '../common/ViewPatients';
import Appointment from './ViewAppoint'
import { logoutUser } from "../../actions/authActions"


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

    const buttonstyle = {
      borderRadius: "10px", backgroundColor: "black", color: "white"
    };

    return (
      <div className="App">

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

              <li className="treeview">
                <button onClick={this.updatePatientAdd}
                  aria-controls="example-collapse-text">
                  <i className="fa fa-files-o"></i>
                  <span>New Patient</span>
                  <span className="pull-right-container">
                    <span className="label label-primary pull-right">4</span>
                  </span>
                </button>
                
              </li>

              <li className="treeview">
                <button onClick={this.updateView}
                  aria-controls="example-collapse-text">
                  <i className="fa fa-files-o"></i>
                  <span>View Patient</span>
                  <span className="pull-right-container">
                    
                  </span>
                </button>
                
              </li>

              <li className="treeview">
                <button onClick={this.updateAppoint} aria-controls="example-collapse-text"
                >
                  <i className="fa fa-pie-chart"></i>
                  <span>Appointments</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right"></i>
                  </span>
                </button>
                
              </li>
              <li>
                <ul className="treeview-menu">
                  <li><a href=""><i className="fa fa-circle-o"></i> Simple tables</a></li>
                  <li><a href=""><i className="fa fa-circle-o"></i> Data tables</a></li>
                </ul>
              </li>
              <li>
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

        {this.state.patientView && (<ViewPatient />)}
        {this.state.patientadd && (<AddPatient />)}
        {this.state.appointment && (<Appointment />)}
        
        <Footer />

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