import React, { Component } from 'react';
import DemoCarousel from './DemoCarousel';
import LandingNavBar from './LandingNavBar';


class Landing extends Component{
    render(){
        return(
            <div>
                <LandingNavBar />
                <DemoCarousel />
            </div>
        );
    }
}

export default Landing;