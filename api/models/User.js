const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userRoll:{
    type: String,
    require:true
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken:{
    type:String
  },
  resetPasswordExpires:{
    type:Date
  },
},
  
  {
    collection: 'users'
  }
);
module.exports = mongoose.model('users', UserSchema);