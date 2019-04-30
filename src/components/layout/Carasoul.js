import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Home extends Component {
    render() {
        return (
            <Carousel showArrows={false} autoPlay={true} infiniteLoop={true} showStatus={false} stopOnHover={false} showThumbs={false}>
                <div style={{width:"800px",position:"center",margin:"10px"}}>
                    <img src={require('./images/image1.jpg')} />
                </div>
                <div>
                    <img src={require('./images/images.jpg')} />
                </div>
                <div>
                    <img src={require('./images/3.jpg')} />
                </div>
            </Carousel>
        );
    }
}

export default Home; 