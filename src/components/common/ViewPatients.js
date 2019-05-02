import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import PatientTable from './PatientTable';
import '../../css/viewPatients.css';


export default class ViewPatient extends Component {


  constructor(props) {
      super(props);
      this.state = {patient: []};
    }


    componentDidMount(){
      axios.get('http://localhost:4000/patient')
        .then(response => {
          this.setState({patient : response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }


    tabRow(){ 
      return this.state.patient.map(function(object, i){
          return <PatientTable obj={object} key={i} />;
      });
    }


    render() {
      return (       
        <div className="container2 center" >
          <h3 className="patientList tc" >Patient List</h3>
          {/* */}
          <Table className="viewPatientTable">
          
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Phone Number</th>
                <th>Email</th>  
              </tr>
            </thead>
            
            <tbody>
              { this.tabRow() }
            </tbody>
          
          </Table>
        </div>
      );
    }
  }









{/*

//react toolbox input example


class InputTest extends React.Component {
  state = { name: '', phone: '', multiline: '', email: '', hint: '', label: '' };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  render () {
    return (
      <section>
        <Input 
            type='text' 
            label='Name' 
            name='name' 
            value={this.state.name} 
            onChange={this.handleChange.bind(this, 'name')} 
            maxLength={16} />
        

        <Input 
            type='text' 
            hint='With Hint, no label' 
            name='name' 
            value={this.state.label} 
            onChange={this.handleChange.bind(this, 'label')} 
            maxLength={16} />


        <Input 
            type='text' 
            label='Disabled field' 
            disabled />


        <Input 
            type='text' 
            multiline 
            label='Multiline' 
            maxLength={20} 
            value={this.state.multiline} 
            onChange={this.handleChange.bind(this, 'multiline')} />

            
        <Input 
            type='email' 
            label='Email address' 
            icon='email' 
            value={this.state.email} 
            onChange={this.handleChange.bind(this, 'email')} />

        <Input 
            type='tel' 
            label='Phone' 
            name='phone' 
            icon='phone' 
            value={this.state.phone} 
            onChange={this.handleChange.bind(this, 'phone')} />

        <Input 
            type='text' 
            value={this.state.hint} 
            label='Required Field' 
            hint='With Hint' 
            required 
            onChange={this.handleChange.bind(this, 'hint')} 
            icon='share' />
        
        <Input 
            type='text' 
            label='error' 
            error={<span>Error!! <a href="#!" onClick={e => { e.preventDefault(); console.log('some help'); }}>?</a></span>} />
      </section>
    );
  }
}

return <InputTest />;
*/}
