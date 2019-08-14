import React, { Component } from 'react';
import DemoCarousel from './DemoCarousel';
import LandingNavBar from './LandingNavBar';
import '../../css/custom.css';
import { Link } from "react-router-dom";

class Landing extends Component{
    render(){
        return(
            <div>
            <div className="nav">
                <LandingNavBar />
            </div>
            <div className="carousel">
            <DemoCarousel />
             </div>

            <div className= "login-set">
            <div class= "row" style={{marginLeft: '150px', paddingTop: '2px'}}>
                 <div className="login-button col-2">
                    <Link to="/login">Admin Login</Link>
                 </div>
                 <div className="login-button col-2">
                    <Link to="/login">Admin Login</Link>
                 </div>
                 <div className="login-button col-2">
                    <Link to="/login">Admin Login</Link>
                 </div>
                 <div className="login-button col-2">
                    <Link to="/login">Admin Login</Link>
                 </div>

                </div> 
            </div>
             </div>

             
        );
    }
}

export default Landing;