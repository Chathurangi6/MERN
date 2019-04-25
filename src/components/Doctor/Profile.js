import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import HeaderBar from "../layout/HeaderBar"
import LinkButtons from "../layout/LinkButtons"
const loading = {
    margin: '1em',
    fontSize: '24px',
  };
  
  const title = {
    pageTitle: 'User Profile Screen',
  };
class Profile extends Component {
    constructor() {
      super();
  
      this.state = {
        fname: '',
        lname: '',
        email: '',
        password: '',
        isLoading: true,
        deleted: false,
        error: false,
      };
    }
  
    async componentDidMount() {
      const accessString = localStorage.getItem('JWT');
      if (accessString == null) {
        this.setState({
          isLoading: false,
          error: true,
        });
      } else {
        await axios
          .get('http://localhost:4000/api/doctor/findUser', {
            params: {
              email: this.props.match.params.email,
            },
            headers: { Authorization: `JWT ${accessString}` },
          })
          .then((response) => {
            this.setState({
              fname: response.data.fname,
              lname: response.data.lname, 
              password: response.data.password,
              isLoading: false,
              error: false,
            });
          })
          .catch((error) => {
            console.error(error.response.data);
            this.setState({
              error: true,
            });
          });
      }
    }
    render() {
        const {
          fname,
          lname,
        //   email,
        //   username,
          password,
          error,
          isLoading,
          
        } = this.state;
    
        if (error) {
          return (
            <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
              <HeaderBar title={title} />
              <div style={loading}>
                Problem fetching user data. Please login again.
              </div>
              <LinkButtons
                buttonText="Login"
               
                link="/login"
              />
            </div>
          );
        }
        if (isLoading) {
          return (
            <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
              <HeaderBar title={title} />
              <div style={loading}>Loading User Data...</div>
            </div>
          );
        }
        return (
            <div>
              <HeaderBar title={title} />
              </div>
              );
            }
          }
          
    Profile.propTypes = {
        // eslint-disable-next-line react/require-default-props
        match: PropTypes.shape({
          params: PropTypes.shape({
            email: PropTypes.string.isRequired,
          }),
        }),
      };
      
      export default Profile;