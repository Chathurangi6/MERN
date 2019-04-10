import React, { Component } from 'react';
import axios from 'axios';

export default class EditRecep extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      fname: '',
      lname: '',
      email:'',
      dob:'',
      phn_number:'',
      password:'',
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/api/receptionist/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                fname: response.data.fname, 
                lname: response.data.lname,
                email: response.data.email,
                dob:response.data.dob,
                phn_number:response.data.phn_number,
                password:response.data.password
             });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  
  onSubmit(e) {
    e.preventDefault();
    const obj = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        dob:this.state.dob,
        phn_number:this.state.phn_number,
        password:this.state.password
    };
    axios.post('http://localhost:4000/business/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Receptionist</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>First Name:  </label>
                    <input 
                      type="text" 
                      id='fname'
                      className="form-control" 
                      value={this.state.fname}
                      onChange={this.onChange}
                      />
                </div>
                <div className="form-group">
                    <label>Last Name: </label>
                    <input type="text" 
                        id='lname'
                      className="form-control"
                      value={this.state.lname}
                      onChange={this.onChange}
                      />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" 
                        id='email'
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChange}
                      />
                </div>
                <div className="form-group">
                    <label>Date of Birth: </label>
                    <input type="date" 
                        id='dob'
                      className="form-control"
                      value={this.state.dob}
                      onChange={this.onChange}
                      />
                </div>
                <div className="form-group">
                    <label>Phone Number: </label>
                    <input type="text" 
                        id='phn_number'
                      className="form-control"
                      value={this.state.phn_number}
                      onChange={this.onChange}
                      />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" 
                        id='password'
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChange}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}