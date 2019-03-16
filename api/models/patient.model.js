const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Patient
let Patient = new Schema({
  
  name: {
    type: String
  },
  age: {
    type: String
  },
  phn_number: {
    type: String
  },
  email:{
    type: String
  }
},{
    collection: 'patient'
});

module.exports = mongoose.model('Patient', Patient);