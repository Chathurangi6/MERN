
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DateAndTime from '../common/dateAndTime';
import '../../css/docDashboard.css';
import { Button } from 'reactstrap';
import axios from 'axios';


class DocDashboard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    profile: true,
    userEmail: null,
    appointDetail: []
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    const { user } = this.props.auth;
    const email = user.email;
    this.setState({
      userEmail: email
    })
    this.getAppointment(email);

  }
  getAppointment(email) {
    const obj = {
      userEmail: email
    };
    console.log(obj.userEmail)
    axios.post('http://localhost:4000/api/appointment/appointToDoctor', obj)
      .then(res => {
        this.setState({ appointDetail: res.data })
      })

  }

  updateProfile = () => {
    this.setState({
      profile: true,
      appointment: false,
    })
  }

  updateAppoint = () => {
    this.setState({
      profile: false,
      appointment: true,
    })
  }



  render() {
    return (
      <div>
        <header className="main-header"> {/*className="main-header*/}
          <div className="adminNawodayatext1 logo" style={{ height: "64px" }}> {/*className="logo"*/}
            <span className="adminNawodayatext"> Doctor Nawodaya</span>
          </div>
          <DateAndTime />
          <nav className="navbar navbar-static-top logoutnav" style={{ width: "100%" }} >
            <div className='logoutdiv tc' style={{ marginLeft: "auto", marginRight: "250px" }} >
              <Button className="logoutbutton grow shadow-5" color='danger' onClick={this.onLogoutClick} >Logout</Button>
            </div>
          </nav>
        </header>

        <aside className="main-sidebar" style={{ position: "absolute" }}>
          <section className="sidebar">
            <div>
              <p className='docHeader tc'> <b> Doctor DashBoard </b></p>
            </div>

            <div className="image1">
              <img src="images/admin.jpg" className="circular--square" alt="User Image" />
            </div>
            <div className="info tc">
              <p className="username"> {this.state.userEmail} </p>

            </div>
            <ul className="sidebar-menu">

              <li className="header tc">MAIN NAVIGATION</li>
              <List component="nav" style={{ backgroundColor: "#2F4F4F" }}>
                <ListItem button onClick={this.updateProfile}>
                  <ListItemText primary="Profile" />
                </ListItem>
              </List>

              <List component="nav" style={{ backgroundColor: "#2F4F4F" }}>
                <ListItem button onClick={this.updateAppoint}>
                  <ListItemText primary="Appointments" />
                </ListItem>
              </List>
            </ul>
          </section>
        </aside>
        <div>

          {/* {this.state.profile && (<Profile/>)} */}

          <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "white", padding: '10px', marginTop: '20px', width: "900px" }}>
            <h3 align="center">Receptionist List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {this.state.appointDetail.map(recep =>
                  <tr key={recep._id}>
                    <td>
                      {recep.p_fname}
                    </td>
                    <td>
                      {recep.p_lname}
                    </td>
                    <td>
                      {recep.phn_number}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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