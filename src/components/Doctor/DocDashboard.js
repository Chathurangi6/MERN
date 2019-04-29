
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '../Receptionist/AppBar';
import '../../css/docDashboard.css';


class DocDashboard extends Component {
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
          <section className="sidebar">
            

            <div>
              <div>
                  <p className='docHeader tc'> <b> Doctor DashBoard </b></p>
              </div>

              <div className="image1">
                <img src="images/admin.jpg" className="circular--square" alt="User Image" />
              </div>
              <div className="info tc">
                <p className="username"> Alexander Pierce </p>
              </div>
            </div>
            

            {/*
            <form action="#" method="get" className="sidebar-form">
              <div className="input-group">
                <input type="text" name="q" className="form-control" placeholder="Search..." />
                <span className="input-group-btn">
                  <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </form>
            */}
            

            <ul className="sidebar-menu">

            <li className="header tc">MAIN NAVIGATION</li>
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