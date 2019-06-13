
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
import Uploader from './Uploader'


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
      <div className  ='container-fluid'>
        <div className='row'>  
          <div className='col-md-2'>
            <div className='row'>
           
            </div>
            <div className='row'>
               <div className='col-md-2'>
              <aside className="main-sidebar" style={{ position: "absolute",minHeight:"100vh",marginTop:"-50px" }}>
              <section className="sidebar">
               <h3 className='username' style={{color:'white',marginLeft:"20px"}}> Doctor Nawodaya </h3>
              </section>
            </aside></div>
            </div>
          </div>
        
          <div className='col-md-10'>
            <div className='row'>
              <header className="main-header" style={{width:'100%'}}> {/*className="main-header*/}
              {/*<DateAndTime />*/}
                <nav className="navbar navbar-static-top logoutnav" style={{ width: "100%" }} >
                  <div className='logoutdiv tc' style={{ marginLeft: "auto" }} >
                    <Button className="logoutbutton grow shadow-5" color='danger' onClick={this.onLogoutClick} >Logout</Button>
                  </div>
                </nav>
              </header>
            </div>
            <div className='row'>
              <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "rgba(255,255,255,0.2)", padding: '10px', marginTop: '20px', width: "900px" }}>
                <h3 align="center">Appointment List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.appointDetail.map(user =>
                      <tr key={user._id}>
                        <td>
                          {user.p_fname}
                        </td>
                        <td>
                          {user.p_lname}
                        </td>
                        <td>
                          {user.phn_number}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>  
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