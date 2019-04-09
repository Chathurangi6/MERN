import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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
            appointDate: "",
            p_fname: "",
            p_lname: "",
            phn_number: "",
            modalIsOpen: false

        }
        this.onChange = this.onChange.bind(this)
        this.search = this.onChange.bind(this)
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmit=this.onSubmit.bind(this)
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    search(e) {
        e.preventDefault();
        const obj = {
            doctor: this.state.doctor,
            appointDate: this.state.appointDate,

        };
        axios.get('http://localhost:4000/api/appointment/search', obj)
            .then(res => console.log(res.data));
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
           // doctor: this.state.doctor,
            p_fname: this.state.p_fname,
            p_lname: this.state.p_lname,
            phn_number: this.state.phn_number

        };
        axios.post('http://localhost:4000/api/appointment/add', obj)
            .then(res => console.log(res.data));

        this.setState({
           // doctor: "",
            p_fname: "",
            p_lname: "",
            phn_number: "",
        })
    }


    componentDidMount() {
        axios.get('http://localhost:4000/api/doctor/name')
            .then(response => {
                this.setState({ doctor: response.data });
                console.log(this.state)
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

    render() {
        return (
            <div className="container" style={{ border: "2px", borderRadius: "5px", backgroundColor: "white", padding: '10px', marginTop: '20px', width: "900px" }}>
                <h3>Appointment Table</h3>
                <form >
                    <div className="input-field col s12">
                        {['fname'].map(key => (
                            <select key={key} onClick={this.onChange} className="form-control">
                                <option>Select a Doctor</option>
                                {this.state.doctor.map(({ [key]: value }) => <option key={value}>{value}</option>)}
                            </select>
                        ))}
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.appointDate}
                            type="Date"
                            id="appointDate"

                        />
                        <label>Date</label>
                    </div>

                    <div className="form-group">
                        <button onClick={this.search} className="btn btn-primary right " >Search Appointment</button>
                    </div>
                </form>
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
                        <button onClick={this.closeModal}>close</button>
                        <div>I am a modal</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.p_fname}
                                    type="text"
                                    id="p_fname"
                                />
                                <label>Patient FirstName</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.p_lname}
                                    type="text"
                                    id="p_lname"
                                />
                                <label>Patient LastName</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.phn_number}
                                    type="text"
                                    id="phn_number"
                                />
                                <label>Phone number</label>
                            </div>

                            <button type="submit">Add</button>
                        </form>
                    </Modal>
                </div>
            </div>
        )


    }
}