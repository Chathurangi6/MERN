import React, { Component } from 'react';
import axios from 'axios';

export default class ViewAppoint extends Component {

    constructor(props){
        super(props);
        this.state={doctor:[]}
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/doctor/name')
    .then(response => {
      this.setState({ doctor: response.data });
      console.log(this.state)
    })
    .catch(function (error) {
      console.log(error);
    })
    }

    render() {
        return (
            <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "white", padding: '10px', marginTop: '20px', width: "900px" }}>
                <h3>Appointment Table</h3>
                <form>
                    <div className="input-field col s12">
                        {['fname'].map(key => (
                            <select key={key} className="form-control">
                                <option>Select a Doctor</option>
                                {this.state.doctor.map(({ [key]: value }) => <option key={value}>{value}</option>)}
                            </select>
                        ))}
                    </div>
                    <div className="form-group">
                      <input type="submit" value="New Appointment" className="btn btn-primary right "/>
                  </div>
                </form>

            </div>
                )
        
                
            }
        }