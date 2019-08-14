import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import CustomButton from '../Buttons/CustomButton';
import { Link } from "react-router-dom";

class LandingNavBar extends Component {

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
                    <div className='d-inline-block' style={{marginLeft: '20px', fontSize: '35px', marginTop: '5px'}}>
                        <b>{'Navodaya Hospital'}</b>
                    </div>
                </Navbar.Brand>
                <div style={{marginLeft: '550px', paddingTop: '2px'}}>
                    <ul>
                    <li><Link to="/">Home </Link></li>
                    <li><Link to="">About Us </Link></li>
                    <li><Link to="">Contact Us </Link></li>
                    <li><Link to="">Login </Link></li>
                    <li><Link to="">Login </Link></li>
                    </ul>
                </div> 
                
            </Navbar>
        );
    }
}

export default LandingNavBar;