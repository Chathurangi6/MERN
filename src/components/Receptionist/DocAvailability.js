import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DocAvailability extends Component {
    constructor(props) {
        super(props);
        this.state={
            docId: '',
            doctors:[],//all the doctors list
            date:"",
            timeslots:[]
        }
        this.onDoctorChange=this.onDoctorChange.bind(this);
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
    onDoctorChange = e => {
        let docdetail = e.target.value.split("-")
        console.log(e.target.value)
        this.setState({ 
            docId: e.target.value,
        })
        this.checkDetails(e.target.value);
    };

    checkDetails = docId =>{
        const obj={
            docId:docId
        };

        axios.get(`http://localhost:4000/api/doctor/get-available-slots/${docId}`)
            .then(res=>{
                console.log('########res', res)
                 if(res.data){
                    this.setState({
                        timeslots:res.data
                    },function(){
                   
                        console.log(this.state.timeslots)
                    })
                }
            })
        
        };

    render() {
        return(
            <div className="container" style={{border:"2px",borderRadius:"5px",backgroundColor:"white",padding:'10px',marginTop:'20px', width:"900px"}}>
                <h3>Check Doctor Availability</h3>
                <div className="input-field col s12">
                    <select id="docName" onClick={this.onDoctorChange} className="form-control">
                        <option>search your doctor</option>
                        {this.state.doctors.map((obj) =>
                            <option value={obj._id} key={obj._id}>{obj.fullname}-{obj.email}</option>
                        )}
                    </select>
                </div>
                <div>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Morninig Session</th>
                                <th>Evening Session</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.timeslots.map(function (slot, key) {
                                return (
                                    <tr key={key}>
                                        <td>{slot.date}</td>
                                        <td>{slot.session1.startTime} - {slot.session1.endTime}</td>
                                        <td>{slot.session2.startTime} - {slot.session2.endTime}</td>
                                    </tr>
                                )
                            },this)}

                        </tbody>
                    </table>
                </div>
          </div>
        )
    }
}
export default DocAvailability;