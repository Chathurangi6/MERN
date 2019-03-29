const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const Doctor = new Schema({
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
  specialist: {
    type: String,
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
    collection: 'doctors'
  }
);
module.exports = mongoose.model('doctors', Doctor);