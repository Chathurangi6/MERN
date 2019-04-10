const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const Doctor = new Schema({
  fname: {
    type: String,
    
  },
  lname: {
    type: String,
    
  },
  email: {
    type: String,
   
  },
  specialist: {
    type: String,
    
  },
  phn_number:{
    type:String,
    
  },
  password: {
    type: String,
    
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