import React, { Component } from 'react';
import {Navbar, Container} from 'react-bootstrap/Navbar';

class Header extends Component{
  render(){
    return(
      <nav class="navbar navbar-inverse">
        <ul class="nav navbar-nav">
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
        </ul>
        <p class="navbar-text">Some text</p>
    </nav>
    )
  }
}

export default Header;