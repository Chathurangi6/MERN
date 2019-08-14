import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerDoctor } from "../../actions/authActions";
import classnames from "classnames";
import '../../css/RegDoctor.css';


class RegDoctor extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      specialist: "",
      phn_number: "",
      availableDate:"",
      availableTime:"",
      password: "",
      password2: "",
      errors: {}
    };
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      fname: this.state.fname,
      lname: this.state.lname,
      specialist: this.state.specialist,
      email: this.state.email,
      phn_number: this.state.phn_number,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerDoctor(newUser, this.props.history);
    this.setState({
      fname: "",
      lname: "",
      email: "",
      specialist: "",
      phn_number: "",
      password: "",
      password2: ""
    })
  };

  
  handleSelectChange = (event) => {
    this.setState({
      specialist: event.target.value
    })
  }

  
  render() {
    const { errors } = this.state;
    return (
      <div className="container container1 br5 shadow-2 ba b--black-10" >
        <div className="row">
          <div className="col s8 ">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className='doctorregist tc'> Doctor Registration </h4>
            </div>
            <form noValidate id="myForm" onSubmit={this.onSubmit}>
              
              <div className="input-field col s6" style={{width:"50%", display:"inline-block"}} >
                <input
                  name="name"
                  onChange={this.onChange}
                  value={this.state.fname}
                  error={errors.fname}
                  id="fname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.fname
                  })}
                />
                <label htmlFor="fname">First Name</label>
                <span className="red-text">{errors.fname}</span>
              </div>
    

              <div className="input-field col s12" style={{width:"50%", display:"inline-block"}}>
                <input
                  name="name"
                  onChange={this.onChange}
                  value={this.state.lname}
                  error={errors.lname}
                  id="lname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lname
                  })}
                />
                <label htmlFor="lname">Last Name</label>
                <span className="red-text">{errors.lname}</span>
              </div>


              <div className="input-field col s12" style={{width:"50%"}}>
                <input
                  icon='email' 
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>

              <div className="input-field col s12"  style={{width:"50%"}} >
                <input
                  icon='phone'
                  name='phone'
                  onChange={this.onChange}
                  value={this.state.phn_number}
                  error={errors.phn_number}
                  id="phn_number"
                  type="text"
                  className={classnames("", {
                    invalid: errors.phn_number
                  })}
                />
                <label htmlFor="phn_number">Phone Number</label>
                <span className="red-text">{errors.phn_number}</span>
              </div>
              

              <div className="input-field col s12" >
                <select style={{backgroundColor:"rgba(255,255,255,0)"}} onClick={this.handleSelectChange}
                  className="form-control"
                  // value={this.state.specialist}
                  error={errors.specialist}
                  // id="specialist"
                >
                  <option>Specialization</option>
                  <option value="ALLERGY AND IMMUNOLOGY">ALLERGY AND IMMUNOLOGY</option>
                  <option value="CARDIAC ELECTROPHYSIOLOGIST">CARDIAC ELECTROPHYSIOLOGIST</option>
                  <option value="CARDIAOTHORACIC SURGEON">CARDIAOTHORACIC SURGEON</option>
                  <option value="CARDIOLOGIST">CARDIOLOGIST</option>
                  <option value="CARDIOLOGIST AND CARDIAC ELECTROPHYSIOLOGIST">CARDIOLOGIST AND CARDIAC ELECTROPHYSIOLOGIST</option>
                  <option value="CARDIOTHORACIC SURGEON">CARDIOTHORACIC SURGEON</option>
                  <option value="CHEST SPECIALIST">CHEST SPECIALIST</option>
                  <option value="CLINICAL NUTRITIONIST">CLINICAL NUTRITIONIST</option>
                  <option value="CONSULTANT SURGEON">CONSULTANT SURGEON</option>
                  <option value="DENTAL SURGEON">DENTAL SURGEON</option>
                  <option value="DENTAL SURGEON / RESTORATIVE DENTISTRY">DENTAL SURGEON / RESTORATIVE DENTISTRY</option>
                  <option value="DERMATOLOGIST">DERMATOLOGIST</option>
                  <option value="DIETICIAN">DIETICIAN</option>
                  <option value="DIETICIAN AND NUTRICIAN">DIETICIAN AND NUTRICIAN</option>
                  <option value="ENDOCRINOLOGIST">ENDOCRINOLOGIST</option>
                  <option value="ENDOCRINOLOGIST AND DIABETOLOGIST">ENDOCRINOLOGIST AND DIABETOLOGIST</option>
                  <option value="ENT SURGEON">ENT SURGEON</option>
                  <option value="ENT(HEAD AND NECK)SURGEON">ENT(HEAD AND NECK)SURGEON</option>
                  <option value="EYE SURGEON">EYE SURGEON</option>
                  <option value="GASTROENTEROLOGICAL AND BARIATRIC SURGEON">GASTROENTEROLOGICAL AND BARIATRIC SURGEON</option>
                  <option value="GASTROENTEROLOGICAL SURGEON">GASTROENTEROLOGICAL SURGEON</option>
                  <option value="GASTROENTEROLOGIST">GASTROENTEROLOGIST</option>
                  <option value="GASTROENTEROLOGIST AND HEPATOBILIARY SURGEON">GASTROENTEROLOGIST AND HEPATOBILIARY SURGEON</option>
                  <option value="GASTROENTEROLOGIST SURGEON">GASTROENTEROLOGIST SURGEON</option>
                  <option value="GASTROINTESTINAL SURGEON">GASTROINTESTINAL SURGEON</option>
                  <option value="GENERAL PHYSICIAN">GENERAL PHYSICIAN</option>
                  <option value="GENERAL SURGEON">GENERAL SURGEON</option>
                  <option value="GENITO URINARY SURGEON">GENITO URINARY SURGEON</option>
                  <option value="GERIATRIC PHYSICIAN">GERIATRIC PHYSICIAN</option>
                  <option value="GYNAECOLOGIST">GYNAECOLOGIST</option>
                  <option value="GYNAECOLOGIST AND SPECIALIST IN SUB-FERTILITY">GYNAECOLOGIST AND SPECIALIST IN SUB-FERTILITY</option>
                  <option value="HAEMATO ONCOLOGIST">HAEMATO ONCOLOGIST</option>
                  <option value="HAEMATOLOGIST">HAEMATOLOGIST</option>
                  <option value="LIVER CENTRE">LIVER CENTRE</option>
                  <option value="MEDICAL GASTROENTEROLOGIST">MEDICAL GASTROENTEROLOGIST</option>
                  <option value="MEDICAL MICROBIOLOGIST">MEDICAL MICROBIOLOGIST</option>
                  <option value="MEMORY CLINIC">MEMORY CLINIC</option>
                  <option value="NEONATOLOGIST">NEONATOLOGIST</option>
                  <option value="NEPHROLOGIST">NEPHROLOGIST</option>
                  <option value="NEURO PHYSICIAN">NEURO PHYSICIAN</option>
                  <option value="NEURO PHYSIOLOGIST">NEURO PHYSIOLOGIST</option>
                  <option value="NEURO SURGEON">NEURO SURGEON</option>
                  <option value="NEUROLOGIST">NEUROLOGIST</option>
                  <option value="NUTRITIONIST">NUTRITIONIST</option>
                  <option value="NUTRITIONIST AND DIETITIAN">NUTRITIONIST AND DIETITIAN</option>
                  <option value="OBSTETRICIAN AND GYNAECOLOGIST">OBSTETRICIAN AND GYNAECOLOGIST</option>
                  <option value="OCCUPATIONAL THERAPIST">OCCUPATIONAL THERAPIST</option>
                  <option value="ONCO SURGEON">ONCO SURGEON</option>
                  <option value="ONCOLOGICAL SURGEON">ONCOLOGICAL SURGEON</option>
                  <option value="ONCOLOGIST">ONCOLOGIST</option>
                  <option value="ONCOLOGIST - CANCER SPECIALIST">ONCOLOGIST - CANCER SPECIALIST</option>
                  <option value="ORAL AND MAXILLOFACIAL SURGEON">ORAL AND MAXILLOFACIAL SURGEON</option>
                  <option value="ORTHODONTIST">ORTHODONTIST</option>
                  <option value="ORTHOPAEDIC SURGEON">ORTHOPAEDIC SURGEON</option>
                  <option value="PAEDIATRIC AND ADOLESCENTS ONCOLOGIST">PAEDIATRIC AND ADOLESCENTS ONCOLOGIST</option>
                  <option value="PAEDIATRIC CARDIOLOGIST">PAEDIATRIC CARDIOLOGIST</option>
                  <option value="PAEDIATRIC CARDIOTHORACIC SURGEON">PAEDIATRIC CARDIOTHORACIC SURGEON</option>
                  <option value="PAEDIATRIC DENTIST">PAEDIATRIC DENTIST</option>
                  <option value="PAEDIATRIC DERMATOLOGIST">PAEDIATRIC DERMATOLOGIST</option>
                  <option value="PAEDIATRIC ENDOCRINOLOGIST">PAEDIATRIC ENDOCRINOLOGIST</option>
                  <option value="PAEDIATRIC NEONATOLOGIST">PAEDIATRIC NEONATOLOGIST</option>
                  <option value="PAEDIATRIC NEPHROLOGIST">PAEDIATRIC NEPHROLOGIST</option>
                  <option value="PAEDIATRIC NEUROLOGIST">PAEDIATRIC NEUROLOGIST</option>
                  <option value="PAEDIATRIC PHYSIOTHERAPIST">PAEDIATRIC PHYSIOTHERAPIST</option>
                  <option value="PAEDIATRIC PULMONOLOGIST">PAEDIATRIC PULMONOLOGIST</option>
                  <option value="PAEDIATRIC SURGEON">PAEDIATRIC SURGEON</option>
                  <option value="PAEDIATRICIAN">PAEDIATRICIAN</option>
                  <option value="PAEDIATRICIAN AND NEONATAL PAEDIATRICIAN">PAEDIATRICIAN AND NEONATAL PAEDIATRICIAN</option>
                  <option value="PAEDIATRICS NEONATOLOGY AND NEONATOLOGY">PAEDIATRICS NEONATOLOGY AND NEONATOLOGY</option>
                  <option value="PAIN MANAGEMENT">PAIN MANAGEMENT</option>
                  <option value="PERIODONTIST AND IMPLANTOLOGIST (DENTAL SURGEON)">PERIODONTIST AND IMPLANTOLOGIST (DENTAL SURGEON)</option>
                  <option value="PHYSICIAN">PHYSICIAN</option>
                  <option value="PHYSICIAN AND ENDOCRINOLOGIST">PHYSICIAN AND ENDOCRINOLOGIST</option>
                  <option value="PHYSICIAN AND ENDOCRINOLOGISTS/DIABETOLOGIST">PHYSICIAN AND ENDOCRINOLOGISTS/DIABETOLOGIST</option>
                  <option value="PHYSICIAN AND GERIATRIC PHYSICIAN">PHYSICIAN AND GERIATRIC PHYSICIAN</option>
                  <option value="PHYSIOLOGIST">PHYSIOLOGIST</option>
                  <option value="PHYSIOTHERAPIST">PHYSIOTHERAPIST</option>
                  <option value="PLASTIC SURGEON">PLASTIC SURGEON</option>
                  <option value="PSYCHIATRIST">PSYCHIATRIST</option>
                  <option value="PSYCHIATRIST (CHILD AND ADOLESCENTS)">PSYCHIATRIST (CHILD AND ADOLESCENTS)</option>
                  <option value="PSYCHOLOGIST">PSYCHOLOGIST</option>
                  <option value="RADIOLOGISTS">RADIOLOGISTS</option>
                  <option value="RESPIRATORY PHYSICIAN">RESPIRATORY PHYSICIAN</option>
                  <option value="RESTORATIVE DENTIST  ">RESTORATIVE DENTIST  </option>
                  <option value="RHEUMATOLOGIST">RHEUMATOLOGIST</option>
                  <option value="S.T.D">S.T.D</option>
                  <option value="SCOLIOSIS CLINIC">SCOLIOSIS CLINIC</option>
                  <option value="SKIN CARE AND COSMETIC - CONSULTANT DERMATOLOGIST">SKIN CARE AND COSMETIC - CONSULTANT DERMATOLOGIST</option>
                  <option value="SKIN CARE AND COSMETIC Â– OCULOPLASTIC  SURGEON">SKIN CARE AND COSMETIC Â– OCULOPLASTIC  SURGEON</option>
                  <option value="SKIN CARE AND COSMETIC CENTRE - PLASTIC SURGEON">SKIN CARE AND COSMETIC CENTRE - PLASTIC SURGEON</option>
                  <option value="SKIN CARE AND COSMETICÂ–CONSULTANT DERMATOLOGIST">SKIN CARE AND COSMETICÂ–CONSULTANT DERMATOLOGIST</option>
                  <option value="SPEECH AND LANGUAGE THERAPIST">SPEECH AND LANGUAGE THERAPIST</option>
                  <option value="SPEECH LANGUAGE PATHALOGIST AND AUDIOLOGIST">SPEECH LANGUAGE PATHALOGIST AND AUDIOLOGIST</option>
                  <option value="SPEECH PATHOLOGIST / CLINICAL AUDIOLOGIST">SPEECH PATHOLOGIST / CLINICAL AUDIOLOGIST</option>
                  <option value="SPEECH PATHOLOGIST/THERAPIST">SPEECH PATHOLOGIST/THERAPIST</option>
                  <option value="SPORTS AND EXERCISE MEDICINE">SPORTS AND EXERCISE MEDICINE</option>
                  <option value="SPORTS MEDICINE">SPORTS MEDICINE</option>
                  <option value="SUB FERTILITY">SUB FERTILITY</option>
                  <option value="SURGEON">SURGEON</option>
                  <option value="THORACIC SURGEON">THORACIC SURGEON</option>
                  <option value="TRANSFUSION PHYSICIAN">TRANSFUSION PHYSICIAN</option>
                  <option value="TRANSPLANT SURGEON">TRANSPLANT SURGEON</option>
                  <option value="UROLOGICAL AND TRANSPLANT SURGEON">UROLOGICAL AND TRANSPLANT SURGEON</option>
                  <option value="UROLOGICAL SURGEON">UROLOGICAL SURGEON</option>
                  <option value="UROLOGIST">UROLOGIST</option>
                  <option value="VASCULAR AND TRANSPLANT SURGEON">VASCULAR AND TRANSPLANT SURGEON</option>
                  <option value="VASCULAR SURGEON">VASCULAR SURGEON</option>
              </select>
              <label htmlFor="specialist"></label>
              <span className="red-text">{errors.specialist}</span>
              </div>
              
              <div className="input-field col s6" style={{width:"50%", display:"inline-block"}}>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              

              <div className="input-field col s6" style={{width:"50%", display:"inline-block"}}>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable "
                >
                  Register
                </button>
              </div>
            </form>
        </div>
      </div>
      </div >
    );
  }
}


RegDoctor.propTypes = {
  registerDoctor: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { registerDoctor }
)(withRouter(RegDoctor));