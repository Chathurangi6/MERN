const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const Receptionist = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  phn_number:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }},
  
  {
    collection: 'receptionist'
  }
);
module.exports = mongoose.model('receptionist', Receptionist);