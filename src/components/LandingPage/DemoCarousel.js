import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
    render() {
        return (
            <Carousel showArrows={false} autoPlay={true} infiniteLoop={true} showStatus={false} stopOnHover={false} showThumbs={false}>
                <div>
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

export default DemoCarousel; 