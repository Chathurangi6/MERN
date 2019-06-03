import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DocAvailability extends Component {
    constructor(props) {
        super(props);
        this.state={
            doctors:[],//all the doctors list
            docName:"",
            docEmail:"",
            date:"",
            timeslots:[]
        }
        this.onChange=this.onChange.bind(this);
        this.setTime=this.onChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/doctor/name')
            .then(response => {
                this.setState({ doctors: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChange = e => {
        let docdetail = e.target.value.split("-")
        let docname = docdetail[0]
        let docemail = docdetail[1]
        this.setState({ 
            docName: docname,
            docEmail:docemail
        },function(){
            console.log(this.state.docEmail);
        });
        this.checkTime(docemail);
    };

    checkTime = docemail =>{
        const obj={
            email:docemail
        };
        console.log(obj);
        axios.post('http://localhost:4000/api/doctor/viewTime',obj)
            .then(res=>{
            
                if(res.data[0]!=undefined){
                    
                    console.log( Object.keys(res.data[0]))
                    this.setState({timeslots:res.data[0].time_slots},function(){
                   
                        console.log(this.state.timeslots)
                    })
                }
            })
        
    };

    setTime(){

    }
    render() {
        return(
            <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
              <h3>Doctor Availability Form</h3>
              <form onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                        <select id="docName" onClick={this.onChange} className="form-control">
                            <option>search your doctor</option>
                            {this.state.doctors.map((obj) =>
                                <option key={obj.fullname}>{obj.fullname}-{obj.email}</option>
                            )}
                        </select>
                    </div>
                  <div className="form-group">
                      <label>Date of Appointment:  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.date}
                        onChange={this.onChange}
                        />
                  </div>
                  <div className="form-group">
                      <label>Time: </label>
                      <select id="time" onClick={this.setTime} className="form-control">
                            <option>search Time</option>
                            {this.state.timeslots.map((obj) =>{
                                return <option key={obj.time_slots}>{obj}</option>
                            }
                            )}
                        </select>
                  </div>
                  
                  <div className="form-group">
                      <input type="submit" value="Check Availability" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
        )
}
}
export default DocAvailability;