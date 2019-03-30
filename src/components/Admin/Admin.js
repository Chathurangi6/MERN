
import React, { Component } from "react";
import Content from './Content';
import Footer from '../layout/Footer';

import * as ReactBootstrap from 'react-bootstrap';
import ViewPatient from '../common/ViewPatients';
import ViewDoctors from './ViewDoctors';
import RegDoctor from './RegDoctor';

class Admin extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      openPatient: false,
      openDoctor: false,
      openRecep: false,
      patientView: false,
      regDoctor:false,
      doctorView: false,
     
    };
  }

  updateView = () => {
    this.setState({
      patientView: true,
      regDoctor:false,
      doctorView:false
    })
  }
  updateRegDoc = () => {
    this.setState({
      regDoctor : true,
      patientView:false,
      doctorView:false
    })
  }
  updateViewDoc = () => {
    this.setState({
      regDoctor : false,
      patientView:false,
      doctorView:true
    })
  }

  render() {
    const { openPatient } = this.state;
    const { openRecep } = this.state;
    const {openDoctor}=this.state;

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
                            <li className="dropdown messages-menu">
                            eslint-disable-next-line
                                <a href="" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-envelope-o"></i>
                                    <span className="label label-success">4</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 4 messages</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <a href="">
                                                    <div className="pull-left">
                                                        <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Support Team
                                                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

        <aside className="main-sidebar">
          <section className="sidebar">
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
                <a href="#" onClick={() => this.setState({ openPatient: !openPatient })}
                  aria-controls="example-collapse-text"
                  aria-expanded={openPatient}>
                  <i className="fa fa-files-o"></i>
                  <span>Patients</span>
                  <span className="pull-right-container">
                    <span className="label label-primary pull-right">4</span>
                  </span>
                </a>
                <ReactBootstrap.Collapse in={this.state.openPatient}>
                  <div id="example-collapse-text">
                    <li>
                      <button  onClick={this.updateView}><i className="fa fa-circle-o" ></i>View</button>
                    </li>
                    <li><a href="" className="nav-link"><i className="fa fa-circle-o"></i> Boxed</a></li>
                    <li><a href="" className="nav-link"><i className="fa fa-circle-o"></i> Fixed</a></li>
                    <li><a href="" className="nav-link"><i className="fa fa-circle-o"></i> Collapsed Sidebar</a></li>
                  </div>
                </ReactBootstrap.Collapse>
              </li>

              <li className="treeview">
                <a href="#" onClick={() => this.setState({ openDoctor: !openDoctor })}
                  aria-controls="example-collapse-text"
                  aria-expanded={openDoctor}>
                  <i className="fa fa-files-o"></i>
                  <span>Doctors</span>
                  <span className="pull-right-container">
                    <span className="label label-primary pull-right">4</span>
                  </span>
                </a>
                <ReactBootstrap.Collapse in={this.state.openDoctor}>
                  <div id="example-collapse-text">
                    <li>
                      <button style={{borderRadius:"10px",backgroundColor:"black",color:"white"}} onClick={this.updateRegDoc}><i className="fa fa-circle-o" ></i>Register</button>
                    </li>
                    <li><button style={{borderRadius:"10px",backgroundColor:"black",color:"white"}} onClick={this.updateViewDoc}><i className="fa fa-circle-o"></i> View</button></li>
                    <li><a href="" className="nav-link"><i className="fa fa-circle-o"></i> Fixed</a></li>
                    <li><a href="" className="nav-link"><i className="fa fa-circle-o"></i> Collapsed Sidebar</a></li>
                  </div>
                </ReactBootstrap.Collapse>
              </li>
              
              <li className="treeview">
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
                    <li><a href="" className="nav-link"><i className="fa fa-circle-o"></i> ChartJS</a></li>
                    <li><a href="" className="nav-link"><i className="fa fa-circle-o"></i> Morris</a></li>
                    <li><a href="" className="nav-link"><i className="fa fa-circle-o"></i> Flot</a></li>
                    <li><a href="" className="nav-link"><i className="fa fa-circle-o"></i> Inline charts</a></li>
                  </div>
                </ReactBootstrap.Collapse>
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
              <li>
                <a href="">
                  <i className="fa fa-envelope"></i> <span>T</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-yellow">12</small>
                    <small className="label pull-right bg-green">16</small>
                    <small className="label pull-right bg-red">5</small>
                  </span>
                </a>
              </li>
            </ul>
          </section>


        </aside>

        {this.state.patientView && (<ViewPatient />)}
        {this.state.regDoctor && (<RegDoctor />)}
       {this.state.doctorView && (<ViewDoctors/>)}

        <Footer/>

      </div>

    );
  }
}
export default Admin;