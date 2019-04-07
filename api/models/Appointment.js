const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const Appoint = new Schema({
  appoint_no: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  p_fname: {
    type: String,
    required: true
  },
  p_lname: {
    type: String,
    required: true
  },
  phn_number:{
    type:String,
    required:true
  },
 
  date: {
    type: Date,
    default: Date.now
  }},
  
  {
    collection: 'apponitments'
  }
);
module.exports = mongoose.model('apponitments', Appoint);