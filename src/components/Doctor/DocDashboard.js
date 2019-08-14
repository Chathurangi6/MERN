import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../../css/docDashboard.css';
import axios from 'axios';
<<<<<<< HEAD
import { Button } from 'reactstrap';

=======
import Uploader from './Uploader'
>>>>>>> 7a0e509cd394a4c5ae3f0f522ed703fa17794939
import UpdateAvailability from  './UpdateAvailability'


class DocDashboard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    profile: true,
    userEmail: null,
    appointDetail: [],
    availability: false
  };

  dashboard = () => {
    this.setState({
      patientView: false,
    })
  }

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

  viewAvailability = () => {
    this.setState({
      availability: true,
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
                <ul className="sidebar-menu">
                    <li className="header tc"></li>
                    <li className="treeview">
                      <List component="nav"  style={{backgroundColor:"#212f39"}}>
                        <ListItem button onClick={this.viewAvailability}  >
                          <i className="fa fa-files-o"></i>
                          <span>Availability</span>
                        </ListItem>
                      </List>
                    </li>
                  </ul>
              </section>
            </aside></div>
            </div>
          </div>
<<<<<<< HEAD
          <div className='col-md-10' style={{paddingLeft:"0px"}}>
            <header className="main-header"> {/*className="main-header*/}
                       
                {/*<DateAndTime/>*/}        
              <nav className="navbar navbar-static-top logoutnav" style={{width:"100%"}} >       
                <div className='logoutdiv tc' style={{marginLeft:"auto", marginRight:"0"}} >
                <Button className="logoutbutton grow shadow-5" color='danger' onClick={this.onLogoutClick} >Logout</Button>
                </div>
              </nav>
            </header>
          {this.state.availability && (<UpdateAvailability/>)}

        </div>
=======
          {this.state.availability && (<UpdateAvailability/>)}

        
>>>>>>> 7a0e509cd394a4c5ae3f0f522ed703fa17794939
          
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