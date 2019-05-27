
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
import Profile from '../Doctor/Profile'


class DocDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: true,
      userEmail: ""
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount(){
    const { user } = this.props.auth;
    this.setState({
      userEmail:user.email
    })
  }

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
    return (
      <div>
    <header className="main-header"> {/*className="main-header*/}
          <div className="adminNawodayatext1 logo" style={{height:"64px"}}> {/*className="logo"*/}
            <span className="adminNawodayatext"> Admin Nawodaya</span>
          </div>         
            <DateAndTime/>        
          <nav className="navbar navbar-static-top logoutnav" style={{width:"100%"}} >       
            <div className='logoutdiv tc' style={{marginLeft:"auto", marginRight:"250px"}} >
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
                <p className="username"> Alexander Pierce </p>

  </div>
            <ul className="sidebar-menu">

            <li className="header tc">MAIN NAVIGATION</li>
              <List component="nav" style={{backgroundColor:"#2F4F4F"}}>
              <ListItem button onClick={this.updateProfile}>
                  <ListItemText primary="Profile" />
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