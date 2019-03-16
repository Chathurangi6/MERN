import React, { Component } from 'react';
import axios from 'axios'

export default class AddPatient extends Component {
  constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeAge = this.onChangeAge.bind(this);
      this.onChangePhnNumber = this.onChangePhnNumber.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          name: '',
          age: '',
          phn_number:'',
          email:''
      }
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value
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
      name: this.state.name,
      age: this.state.age,
      phn_number: this.state.phn_number,
      email: this.state.email
    };
    axios.post('http://localhost:4000/patient/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      name: '',
      age: '',
      phn_number: '',
      email:''
    })
  }
 
  render() {
      return (
          <div style={{ marginTop: 10 }}>
              <h3>Add New Patient</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Name:  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
                  </div>
                  <div className="form-group">
                      <label>Age: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.age}
                        onChange={this.onChangeAge}
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