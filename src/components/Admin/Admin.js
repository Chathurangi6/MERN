
import React, { Component } from "react";
import Header from './components/Admin/Header';
import Sidebar from './components/Admin/Sidebar';
import Content from './components/Admin/Content'

class Admin extends Component {
  render() {
    return (
      
        <div className="App">
          
          <Header/>
          <Sidebar/>
          <Content/>
        </div>
      
    );
  }
}
export default Admin;