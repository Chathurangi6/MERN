import React, { Component } from 'react';
import './slide.css'
class Slide extends Component {
    render() {
        return (
<section class="view intro-2" className='backgrImg'>
      <div class="mask">
        <div class="container h-100 d-flex justify-content-center align-items-center">
          <div class="row flex-center pt-5 mt-3">
            <div class="col-md-12 col-lg-6 text-center text-md-left margins">
              <div class="white-text">
                <h1 class="h1-responsive font-weight-bold mt-md-5 mt-0 wow fadeInLeft animated" data-wow-delay="0.3s" className="landing">Nawodaya
                  Hospital</h1>
                
                <p class="wow fadeInLeft mb-3 animated" data-wow-delay="0.3s" style={{visibility: 'visible', animationName: 'fadeInLeft', animationDelay: '0.3s'}}>Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Rem repellendus quasi fuga nesciunt
                  dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea dolor molestiae
                  iste.
                </p>
                
                <a class="btn btn-unique btn-rounded font-weight-bold ml-lg-0 wow fadeInLeft waves-effect waves-light animated" data-wow-delay="0.3s" style={{visibility: 'visible', animationName: 'fadeInLeft' ,animationDelay: "0.3s"}}>Login</a>
              </div>
            </div>

            <div class="col-md-12 col-lg-6 wow fadeInRight d-flex justify-content-center animated" data-wow-delay="0.3s" style={{visibility: 'visible', animationName: 'fadeInRight', animationDelay: '0.3s'}}>

            </div>
          </div>
        </div>
      </div>
    </section>
     );
    }
}

export default Slide; 