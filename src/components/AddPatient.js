import React, { Component } from 'react';
import axios from 'axios'

export default class AddPatient extends Component {
  constructor(props) {
      super(props);
      this.onChangeFName = this.onChangeFName.bind(this);
      this.onChangeLName = this.onChangeLName.bind(this);
      this.onChangeDOB = this.onChangeDOB.bind(this);
      this.onChangePhnNumber = this.onChangePhnNumber.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          fname: '',
          lname:'',
          dob: '',
          phn_number:'',
          email:'',
      }
  }
  onChangeFName(e) {
    this.setState({
      fname: e.target.value
    });
  }
  onChangeLName(e) {
    this.setState({
      lname: e.target.value
    });
  }
  onChangeDOB(e) {
    this.setState({
      dob: e.target.value
    })  
  }
  onChangePhnNumber(e) {
    this.setState({
      phn_number: e.target.value
    })
  }
  onChangeEmail(e){
      this.setState({
          email:e.target.value
      })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      fname: this.state.fname,
      lname: this.state.lname,
      dob: this.state.dob,
      phn_number: this.state.phn_number,
      email: this.state.email
    };
    axios.post('http://localhost:4000/patient/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      fname: '',
      lname:'',
      dob: '',
      phn_number: '',
      email:''
    })
  }
 
  render() {
      return (
          <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
              <h3>Add New Patient</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>First Name:  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.fname}
                        onChange={this.onChangeFName}
                        />
                  </div>
                  <div className="form-group">
                      <label>Last Name:  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.lname}
                        onChange={this.onChangeLName}
                        />
                  </div>
                  <div className="form-group">
                      <label>Date of Birth: </label>
                      <input type="date" 
                        className="form-control"
                        value={this.state.dob}
                        onChange={this.onChangeDOB}
                        />
                  </div>
                  <div className="form-group">
                      <label>Phone Number: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.phn_number}
                        onChange={this.onChangePhnNumber}
                        />
                  </div>
                  <div className="form-group">
                      <label>Email: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Register" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
      )
  }
}