import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSlot } from "../../actions/doctorActions";
import classnames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class UpdateAvilability extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      errors: "",
      doctorId: "",
      date:"",
      time1: "",
      time2:"",
      time3:"",
      time4: "",
    };
    this.time1handleChange = this.time1handleChange.bind(this);
    this.time2handleChange = this.time2handleChange.bind(this);
    this.time3handleChange = this.time3handleChange.bind(this);
    this.time4handleChange = this.time4handleChange.bind(this);
  }

  onChange = e => {
    this.setState({ date: e.target.value });
  };

  time1handleChange(time) {
    this.setState({
      time1: time
    });
  }
  time2handleChange(time) {
    this.setState({
      time2: time
    });
  }
  time3handleChange(time) {
    this.setState({
      time3: time
    });
  }
  time4handleChange(time) {
    this.setState({
      time4: time
    });
  }
  onSubmit = e => {
    e.preventDefault();
    const newData = {
      doctorId: "5d52ebcb2f3b5574cc31ec4b",
      date: this.state.date,
      session1: {
          startTime: new Date(this.state.time1).toLocaleTimeString("en-US"),
          endTime: new Date(this.state.time2).toLocaleTimeString("en-US"),
      },
      session2: {
        startTime: new Date(this.state.time3).toLocaleTimeString("en-US"),
        endTime: new Date(this.state.time4).toLocaleTimeString("en-US"),
      },
    };
    this.props.createSlot(newData, this.props.history); 
  };
  
render() {
  const { errors } = this.state;
  return (
    <div className="container center br5 shadow-2 ba b--black-10" 
    style={{
      backgroundColor:"rgba(0,0,0,0)",
      padding:'10px',
      backgroundColor:"rgba(255,255,255,0.540756285424326)",
      marginTop:'20px',
      width:"69%",
      marginBottom:"30px",
      overflow:'hidden',
      height: 'auto'
      }}>
        <div className="">
            <div className="col s8 offset-s2" style={{paddingLeft:"20px", paddingRight:"20px"}} >
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4 style={{fontFamily:"Acme"}}>
                  Availability
                </h4>
            </div>
            <form noValidate id="myForm" onSubmit={this.onSubmit}>
              <div className="input-field col s12" style={{marginTop:"20px", marginBottom:"15"}}>
                <div style={{width:"240px"}} >
                  <label htmlFor="specialist" style={{display:"inline-block", fontSize:"15px", float:"left", marginTop:"15px"}} >Date</label>
                    <input
                    style={{display:"inline-block", width:"125px", left:""}}
                      onChange={this.onChange}
                      value={this.state.date}
                      // error={errors.date}
                      id="data"
                      type="Date"
                      // className={classnames("", {
                      //   invalid: errors.date
                      // })}
                    />
                  {/* <span className="red-text">{errors.date}</span> */}
                </div>
                <div>
                <label htmlFor="specialist" style={{display:"inline-block", fontSize:"15px", float:"left", marginTop:"15px"}} >Start Time</label>
                  <DatePicker
                      selected={this.state.time1}
                      onChange={this.time1handleChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeFormat="HH:mm"
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                  />
                </div>
                
                <div>
                <label htmlFor="specialist" style={{display:"inline-block", fontSize:"15px", float:"left", marginTop:"15px"}} >End Time</label>
                  <DatePicker
                      selected={this.state.time2}
                      onChange={this.time2handleChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                  />
                </div>
                <div>
                <label htmlFor="specialist" style={{display:"inline-block", fontSize:"15px", float:"left", marginTop:"15px"}} >Start Time</label>
                  <DatePicker
                      selected={this.state.time3}
                      onChange={this.time3handleChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                  />
                </div>
                <div>
                <label htmlFor="specialist" style={{display:"inline-block", fontSize:"15px", float:"left", marginTop:"15px"}} >End Time</label>
                  <DatePicker
                      selected={this.state.time4}
                      onChange={this.time4handleChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                  />
                </div>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px", height:"100px"}}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    float:"left"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
UpdateAvilability.propTypes = {
    createSlot: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  // errors: state.errors
});
export default connect(
  mapStateToProps,
  { createSlot }
)(withRouter(UpdateAvilability));