
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Footer from '../layout/Footer';
import AddPatient from '../Receptionist/AddPatient'
import * as ReactBootstrap from 'react-bootstrap';
import ViewPatient from '../common/ViewPatients';
import Appointment from '../Receptionist/ViewAppoint'
import { logoutUser } from "../../actions/authActions"


class Admin extends Component {
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
      regDoctor: false,
      doctorView: false,
      recepView: false
    })
  }
  updateRegDoc = () => {
    this.setState({
      regDoctor: true,
      patientView: false,
      doctorView: false,
      regReceptionist: false,
      recepView: false
    })
  }
  updateViewDoc = () => {
    this.setState({
      regDoctor: false,
      patientView: false,
      doctorView: true,
      regReceptionist: false,
      recepView: false
    })
  }
  updateRegRecep = () => {
    this.setState({
      regDoctor: false,
      patientView: false,
      doctorView: false,
      regReceptionist: true,
      recepView: false
    })
  }
  updateViewRecep = () => {
    this.setState({
      regDoctor: false,
      patientView: false,
      doctorView: false,
      regReceptionist: false,
      recepView: true
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
                <a href="#" 
                  aria-controls="example-collapse-text">
                  <i className="fa fa-files-o"></i>
                  <span>Patients</span>
                  <span className="pull-right-container">
                    <span className="label label-primary pull-right">4</span>
                  </span>
                </a>
                
              </li>

              <li className="treeview">
                <a href="#" 
                  aria-controls="example-collapse-text">
                  <i className="fa fa-files-o"></i>
                  <span>Doctors</span>
                  <span className="pull-right-container">
                    
                  </span>
                </a>
                
              </li>

              <li className="treeview">
                <a href="#"  aria-controls="example-collapse-text"
                >
                  <i className="fa fa-pie-chart"></i>
                  <span>Receptionists</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                
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
        {this.state.regDoctor && (<RegDoctor />)}
        {this.state.doctorView && (<ViewDoctors />)}
        {this.state.regReceptionist && (<RegReceptionist />)}
        {this.state.recepView && (<ViewRecep />)}

        <Footer />

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