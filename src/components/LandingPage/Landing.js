import React, { Component } from 'react';
import DemoCarousel from './DemoCarousel';
import LandingNavBar from './LandingNavBar';


class Landing extends Component{
    render(){
        return(
            <div>
                <div className="h-5" style={{overflow:'hidden'}}>
                    <LandingNavBar />
                </div>
                <div className="h-80">
                    <DemoCarousel />
                </div>
            </div>
            
        );
    }
}

export default Landing;