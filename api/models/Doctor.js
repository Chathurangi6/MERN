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
  imageName:{
    type:String,
  },
  imageData:{
    type:String
  },
  
  date: {
    type: Date,
    default: Date.now
  }},
  
  {
    collection: 'doctors'
  }
);
// doctors.aggregate(
//   [
//      { $project: {fullname : { $concat: [ "$fname", "  ", "$lname" ] } } }
//   ]
// )

// Doctor.virtual('fullname').get(function () {
//   return [this.fname, this.lname].filter(Boolean).join(' ');
// });
module.exports = mongoose.model('doctors', Doctor);