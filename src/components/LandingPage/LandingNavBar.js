import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import CustomButton from '../Buttons/CustomButton';
import { Link } from "react-router-dom";
import ReactRevealText from '../revealText';

class LandingNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false };
      }
    
      componentDidMount() {
        setTimeout(() => {
          this.setState({ show: true });
        }, 500);
      }
    
    
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                {/* <img src={require('./images/logo1.png')} /> */}
                <Navbar.Brand href="#home" style={{fontSize: '30px'}}>
                    <div className='d-inline-block' style={{marginLeft: '10px', marginTop: '17px'}}>
                        <img 
                            src={require('./images/a.png')} 
                            height='50'
                            width='50' 
                            className="d-inline-block align-top" />
                    </div>
                    <div className='d-inline-block' style={{marginLeft: '20px'}}>
                        <div>
                            <ReactRevealText
                                show={this.state.show}
                                style={{fontSize: "30px", marginTop: "5px"}}>
                                Navodaya Hospital
                            </ReactRevealText>
                        </div>
                    </div>
                </Navbar.Brand>
                <div style={{marginLeft: '850px', paddingTop: '2px'}}>
                    <Link to="/login">
                        <CustomButton type="success" text="Sign In" link="/login" />
                    </Link>
                </div> 
            </Navbar>
        );
    }
}

export default LandingNavBar;