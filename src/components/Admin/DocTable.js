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
  
  class DocTable extends Component {
    constructor(props) {
      super(props);
      this.state={
        fname: '',
        lname: '',
        email:'',
        specialist:'',
        phn_number:'',
       
        modalIsOpen: false
      }
      this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.delete = this.delete.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
              specialist:this.state.specialist,
              phn_number:this.state.phn_number,
              
          };
          axios.post('http://localhost:4000/api/doctor/update/'+this.props.obj._id, obj)
              .then(res => console.log(res.data));
              this.setState({
                fname: '',
                lname: '',
                email:'',
                specialist:'',
                phn_number:''
              })
          
          
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

          openModal() {
            axios.get('http://localhost:4000/api/doctor/edit/'+this.props.obj._id)
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
        }
        
        render() {
            return (
                <tr>
                <td>
                  {this.props.obj.fname}
                </td>
                <td>
                  {this.props.obj.lname}
                </td>
                <td>
                  {this.props.obj.email}
                </td>
                <td>
                  {this.props.obj.specialist}
                </td>
                <td>
                  {this.props.obj.phn_number}
                </td>
                <td>
                  <button onClick={this.openModal} className="btn btn-primary">Edit</button>
                  <Modal
                              isOpen={this.state.modalIsOpen}
                              onAfterOpen={this.afterOpenModal}
                              onRequestClose={this.closeModal}
                              style={customStyles}
                              contentLabel="Example Modal"
                          >
                          <h2 ref={subtitle => this.subtitle = subtitle}>Update Doctor</h2>
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
                  <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
              </tr>
          );
        }
      }
      
      export default DocTable;