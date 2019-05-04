import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import Modal from 'react-modal';

const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      margin:"10px"
  }
};

class ViewDoctors extends Component {
  constructor() {
    super();
    this.state = { doctors: [], filtered: [], search: "",
    fname: '',
    lname: '',
    email:'',
    specialist:'',
    phn_number:'', 
    modalIsOpen: false
   };
  this.onChange = this.onChange.bind(this);
this.onSubmit = this.onSubmit.bind(this);
this.delete = this.delete.bind(this);
this.openModal = this.openModal.bind(this);
this.afterOpenModal = this.afterOpenModal.bind(this);
this.closeModal = this.closeModal.bind(this);
  }

  onSubmit(id) {
    
    const obj = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        specialist:this.state.specialist,
        phn_number:this.state.phn_number,
        
    };
    axios.post('http://localhost:4000/api/doctor/update/'+id, obj)
        .then( this.fetchData());
        this.setState({
          fname: '',
          lname: '',
          email:'',
          specialist:'',
          phn_number:''
        })
    
    
  }
  
  delete(id) {
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
          axios.get('http://localhost:4000/api/doctor/delete/' + id)
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

    openModal(id) {
      axios.get('http://localhost:4000/api/doctor/edit/'+id)
        .then(response => {
            this.setState({ 
              modalIsOpen: true,
              fname: response.data.fname, 
              lname: response.data.lname,
              email: response.data.email,
              specialist:response.data.specialist,
              phn_number:response.data.phn_number,
             
           });
        })
        .catch(function (error) {
            console.log(error);
        })
  }
  
  afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
  }
  
  closeModal() {
      this.setState({ modalIsOpen: false });
      this.fetchData();
  }

  fetchData() {
    axios.get('http://localhost:4000/api/doctor/view')
      .then(response => {
        this.setState({ doctors: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  componentDidMount() {
    this.fetchData();
  }

  onChange(e) {
    this.setState({
      [e.target.id]:e.target.value
    }) 
  };

  // tabRow() {
  //   return this.state.doctors.map(function (object, i) {
  //     return <DocTable obj={object} key={i} />;
  //   });
  // }


  render() {
    let { doctors } = this.state;
     const { search } = this.state;
    return (
      <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "white", padding: '10px', marginTop: '20px', width: "900px" }}>
        <h3 align="center">Doctor List</h3>

        <input type="search"
          placeholder="Search..."
          onChange={this.onChange}
          id='search'
        />
        {/* <input type="text" className="input" onChange={this.handleInputChange}  value={this.state.query} placeholder="Search..." /> */}
        
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
           {this.state.doctors.map(doctor=>
            <tr key={doctor._id}>
                <td>
                  {doctor.fname}
                </td>
                <td>
                  {doctor.lname}
                </td>
                <td>
                  {doctor.email}
                </td>
                <td>
                  {doctor.specialist}
                </td>
                <td>
                  {doctor.phn_number}
                </td>
                <td>
                  <button onClick={()=>this.openModal(doctor._id)} className="btn btn-primary">Edit</button>
                  {/* this modal for update doctor details */}
                  <Modal
                              isOpen={this.state.modalIsOpen}
                              onAfterOpen={this.afterOpenModal}
                              onRequestClose={this.closeModal}
                              style={customStyles}
                              contentLabel="Example Modal"
                          >
                          <h2 ref={subtitle => this.subtitle = subtitle}>Update Doctor</h2>
                              <form onSubmit={()=>this.onSubmit(doctor._id)}>
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
                          <label>Speciality: </label>
                          <input type="text" 
                              id='specialist'
                            className="form-control"
                            value={this.state.specialist}
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
                      {/* <div className="form-group">
                          <label>Password: </label>
                          <input type="password" 
                              id='password'
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChange}
                            />
                      </div> */}
                      <div className="form-group">
                          <input type="submit" 
                            value="Update" 
                            className="btn btn-primary"/>
                            <button onClick={this.closeModal} className="btn btn-primary" style={{margin:"10px"}}>close</button>
                      </div>
                  </form>
                  </Modal>
                  {/* <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link> */}
                </td>
                <td>
                  <button onClick={()=>this.delete(doctor._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
           )}
            
          </tbody>
        </table>
      </div>

    );
  }
}

export default ViewDoctors;