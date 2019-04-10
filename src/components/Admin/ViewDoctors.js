import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

class ViewDoctors extends Component {
  constructor() {
    super();
    this.state = { doctor: [],filtered: [],query:"" };
     this.delete = this.delete.bind(this);
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


  delete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        axios.get('http://localhost:4000/api/doctor/delete/' + this.props.obj._id)
        this.fetchData();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ) 
      }
    })
      .catch(err => console.log(err))
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
          <button onClick={this.delete}>kk</button> 
          {this.state.doctor.map(function (item, key) {
                   
              return (
                <tr key={key}>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td>{item.specialist}</td>
                  <td>{item.phn_number}</td>
                  
                  <td>
                    <Link to={"/edit/" + item._id} className="btn btn-primary">Edit</Link>
                  </td>
                  <td>
                    <button onClick={()=>this.delete} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
      
    );
  }
}

export default ViewDoctors;