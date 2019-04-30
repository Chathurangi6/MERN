import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import CustomButton from '../Buttons/CustomButton';

class LandingNavBar extends Component {

    render() {
        return(
            <Navbar bg="dark" variant="dark">
                {/* <img src={require('./images/logo1.png')} /> */}
                <Navbar.Brand href="#home" style={{fontSize: '30px'}}>
                    <div className='d-inline-block' style={{marginLeft: '10px'}}>
                        <img 
                            src={require('./images/a.png')} 
                            height='50'
                            width='50' 
                            className="d-inline-block align-top" />
                    </div>
                    <div className='d-inline-block' style={{marginLeft: '20px'}}>
                        <b>{'Navodaya Hospital'}</b>
                    </div>
                </Navbar.Brand>
                <div style={{paddingTop: '5px', marginLeft: '850px'}}>
                    <CustomButton type="success" text="Sign In" />
                </div> 
            </Navbar>
        );
    }
}

export default LandingNavBar;