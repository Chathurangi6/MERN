import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import CustomButton from '../Buttons/CustomButton';
import { Link } from "react-router-dom";
import ReactRevealText from '../revealText';
import Button from 'react-bootstrap/Button';

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
                    <div className='d-inline-block' style={{marginLeft: '10px', }}>
                        <img 
                            src={require('./images/a.png')} 
                            height='50'
                            width='50' 
                            className="d-inline-block" />
                    </div>
                    <div className='d-inline-block' style={{marginLeft: '20px'}}>
                        <div>
                            <ReactRevealText
                                show={this.state.show}
                                style={{fontSize: "30px", marginBottom: "15px"}}>
                                Navodaya Hospital
                            </ReactRevealText>
                        </div>
                    </div>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/login">
                        <Button
                            style={{marginLeft: '900px'}}
                            variant="outline-success">Sign In</Button>
                    </Link>
                </Nav>
            </Navbar>
        );
    }
}

export default LandingNavBar;