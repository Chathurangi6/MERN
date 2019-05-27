const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const Appointment = new Schema({
  appoint_no: {
    type: String,
    
  },
  doctor: {
    type: String,
    
  },
  docEmail:{
    type:String
  },

  p_fname: {
    type: String,
    
  },
  p_lname: {
    type: String,
    
  },
  phn_number:{
    type:String,
    
  },
 
  date: {
    type: Date,
    default: Date.now
  }},
  
  {
    collection: 'appointments'
  }
);
module.exports = mongoose.model('appointments', Appointment);