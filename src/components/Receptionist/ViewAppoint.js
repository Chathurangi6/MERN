import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class ViewAppoint extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctor: [],
            docName: "",
            docEmail: " ",
            matching:[],
            p_fname: "",
            p_lname: "",
            phn_number: "",
            timeslots:[],
            time:"",
            modalIsOpen: false,
            selectDate:"",
            selectTime:""
        }
        this.onChange = this.onChange.bind(this)
        this.search = this.search.bind(this)
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.cancelAppoint=this.cancelAppoint.bind(this);
        this.onChangeDoctor=this.onChangeDoctor.bind(this);
    }
    onChange = e => {
        let docdetail = e.target.value.split("-")
        let docname = docdetail[0]
        let docemail = docdetail[1]
        this.setState({ 
            docName: docname,
            docEmail:docemail
        });
        this.search();
    };

    onChangeForm = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    //search relevant appointments to a doctor
    search() {
       
        const obj = {
            doctor: this.state.docName
        };
        const obj2={
            email:this.state.docEmail
        }
        axios.post('http://localhost:4000/api/appointment/search', obj)
            .then(res => {
                this.setState({ matching: res.data })})
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            doctor: this.state.docName,
            docEmail : this.state.docEmail,
            p_fname: this.state.p_fname,
            p_lname: this.state.p_lname,
            phn_number: this.state.phn_number,
            

        };
        axios.post('http://localhost:4000/api/appointment/add', obj)
            .then(res => this.search());

        this.setState({
            // doctor: "",
            p_fname: "",
            p_lname: "",
            phn_number: "",
        })
        
    }

    cancelAppoint=id=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
          }).then((result) => {
            if (result.value) {
              axios.get('http://localhost:4000/api/appointment/delete/' + id)
              Swal.fire(
                'Canceled!',
                'Appointment has been canceled.',
                'success'
              )
            }
          })
            .catch(err => console.log(err))
        }

        // checkDetails = pemail =>{
        //     const obj={
        //         email:pemail
        //     };
        //     console.log(obj);
        //     axios.post('http://localhost:4000/patient/viewDetails',obj)
        //         .then(res=>{
                
        //             if(res.data[0]!=undefined){
                        
        //                 console.log( Object.keys(res.data[0]))
        //                 this.setState({
        //                     p_fname:res.data[0].fname,
        //                     p_lname:res.data[0].lname
        //                 },function(){
                       
        //                 })
        //             }
        //         })       
        // };
    

    componentDidMount() {
        axios.get('http://localhost:4000/api/doctor/name')
            .then(response => {
                this.setState({ doctor: response.data });
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
        
    }

    onChangePatientId(e){
        e.preventDefault();
        console.log(e.target.value)
        const obj = {
             id: e.target.value
        };
        // axios.post('http://localhost:4000/api/appointment/search', obj)
        //     .then(res => {
        //         this.setState({ matching: res.data })})
    }

    onChangeDoctor(e){
        this.setState({ docName: e.target.value });
    }

    onChangeDate(e){
        this.setState({ selectDate: e.target.value });
    }

    onChangeTime(e){
        this.setState({ selectTime: e.target.value });
    }

    componentDidUpdate(prevProps, prevState) {
         if (this.state.docName !== "" && prevState.docName !== this.state.docName){

            const obj = {
                doctor: this.state.docName
            };
             axios.post('http://localhost:4000/api/appointment/search', obj)
             .then(res => {
                 this.setState({ matching: res.data })})
                 
        }
        
            
         if(this.state.selectDate !== "" && prevState.selectDate !== this.state.selectDate){
            axios.get() // todo
        }
        else if(this.state.selectTime !== "" && prevState.selectTime !== this.state.selectTime){
            axios.get() // todo
        }
        return null
    }

    render() {
        return (
            <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "white", padding: '10px', marginTop: '20px', width: "900px" }}>
                <h3>Appointment Table</h3>
                <form >
                    <div className="container">
                        <div className="input-field col s6">
                            <select id="docName" onClick={e => this.onChangeDoctor(e)} className="form-control">
                                <option>select your doctor</option>
                                {this.state.doctor.map((obj) =>
                                    <option key={obj.fullname}>{obj.fullname}-{obj.email}</option>
                                )}
                            </select>
                        </div>
                        <div className="input-field col s3">
                            <select onClick={e => this.onChangeDate(e)} id="appointDate" className="form-control">
                                    <option>select date</option>
                            </select>
                        </div>

                        <div className="input-field col s3">
                            <select onClick={e => this.onChangeTime(e)} id="appointTime" className="form-control">
                                    <option>select time</option>
                            </select>
                        </div>
                    </div>
{/* 
                    <div className="form-group">
<<<<<<< HEAD
                        <button onClick={this.search()} className="btn btn-primary right " ></button>
                    </div> 
=======
                        <button onClick={this.search} className="btn btn-primary right " >Search Appointment</button>
                    </div> */}
>>>>>>> doctor_availability
                </form>
                <div>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>

                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.matching.map(function (item, key) {

                                return (
                                    <tr key={key}>
                                        <td>{item.p_fname}</td>
                                        <td>{item.p_lname}</td>
                                        <td>{item.phn_number}</td>
                                        <td><button onClick={()=>this.cancelAppoint(item._id)} className="btn btn-danger">Cancel</button></td>
                                    </tr>
                                )
                            },this)}

                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={this.openModal}>New Appointment</button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <h2 ref={subtitle => this.subtitle = subtitle}>Add New Appointment</h2>
                        
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Doctor Name: {this.state.docName}  </label>
                            </div>

                            <div className="form-group">
                                <label>Appointment Number :   </label> 
                                {/* to do get appoin num */}
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChangePatientId} 
                                    // value={this.state.p_fname} todo
                                    type="text"
                                    id="p_id"
                                />
                                <label>Patient Id</label>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChangeForm}
                                    value={this.state.p_fname}
                                    type="text"
                                    id="p_fname"
                                />
                                <label>Patient FirstName</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChangeForm}
                                    value={this.state.p_lname}
                                    type="text"
                                    id="p_lname"
                                />
                                <label>Patient LastName</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChangeForm}
                                    value={this.state.phn_number}
                                    type="text"
                                    id="phn_number"
                                />
                                <label>Phone number</label>
                            </div>
                            <button onClick={this.closeModal} className="btn btn-primary right" style={{margin:"5px"}}>close</button>
                            <button type="submit" className="btn btn-primary right" style={{margin:"5px"}}>Add</button>
                            
                        </form>
                    </Modal>
                </div>
            </div>
        )


    }
}