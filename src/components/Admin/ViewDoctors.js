import React, { Component } from 'react';
import axios from 'axios';
import DocTable from './DocTable'

class ViewDoctors extends Component {
  constructor() {
    super();
    this.state = { doctor: [],filtered: [],query:"" };//doctor:all doctors list
     
    // this.fetchData=this.fetchData.bind(this);
    // this. handleInputChange=this. handleInputChange.bind(this);
  }

  fetchData(){
    axios.get('http://localhost:4000/api/doctor/view')
    .then(response => {
      this.setState({ doctor: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  componentDidMount() {
    this.fetchData();
   }

   handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filtered = prevState.data.filter(element => {
        return element.email.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filtered
      };
    });
  };

  getData = () => {
    fetch(`http://localhost:4000/api/doctor/view`)
      .then(response => response.json())
      .then(doctor => {
        const { query } = this.state;
        const filtered = doctor.filter(element => {
          return element.email.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          doctor,
          filtered
        });
      });
  };

  componentWillMount() {
    this.getData();
  }

  tabRow(){
    return this.state.doctor.map(function(object, i){
        return <DocTable obj={object} key={i}  />;
    });
  }
 

  render() {
    return (
      <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "white", padding: '10px', marginTop: '20px', width: "900px" }}>
        <h3 align="center">Doctor List</h3>
      
        <input type="text" className="input" onChange={this.handleInputChange}  value={this.state.query} placeholder="Search..." />
        <div>{this.state.filtered.map(i => <p>{i.email}</p>)}</div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
          
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Speciality</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>

          </thead>
          <tbody>
          { this.tabRow() }
          </tbody>
        </table>
      </div>
      
    );
  }
}

export default ViewDoctors;