import React, { Component } from 'react';
import axios from 'axios'

export default class Appointment extends Component {
  constructor(props) {
      super(props);
      this.onChangeFName = this.onChangeFName.bind(this);
      this.onChangeLName = this.onChangeLName.bind(this);
      this.onChangeDoctor = this.onChangeDoctor.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onChangeTime = this.onChangeTime.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          fname: '',
          lname: '',
          doctor: '',
          date:'',
          time:''
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
  onChangeDoctor(e) {
    this.setState({
      doctor: e.target.value
    })  
  }
  onChangeDate(e) {
    this.setState({
      date: e.target.value
    })
  }
  onChangeTime(e){
      this.setState({
          time:e.target.value
      })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      fname: this.state.fname,
      lname: this.state.lname,
      doctor: this.state.doctor,
      date: this.state.date,
      timel: this.state.time
    };
    axios.post('http://localhost:4000/patient/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      fname: '',
      lname: ''
      
    })
  }
 
  render() {
      return (
          <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
              <h3>Add Appointment</h3>
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
                      <label>Doctor: </label>
                      <select 
                        className="form-control"
                        value={this.state.doctor}
                        onChange={this.onChangeDoctor}
                        >
                        <option value="Dr.S">Dr.S</option>
                        <option value="Dr.V">Dr.V</option>
                      </select>
                  </div>
                  <div className="form-group">
                      <label>Date: </label>
                      <input type="date" 
                        className="form-control"
                        value={this.state.date}
                        onChange={this.onChangeDate}
                        />
                  </div>
                  <div className="form-group">
                      <label>Time: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.time}
                        onChange={this.onChangeTime}
                        />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="SET" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
      )
  }
}