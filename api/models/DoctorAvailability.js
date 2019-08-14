const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DoctorAvailability = new Schema({
  doctorId: {
    type: String,
  },
  date: {
    type: String,
  },
  session1: {
    type: Object,
  },
  session2: {
    type: Object,
  }},
  {
    collection: 'doctor_availability'
  }
);

module.exports = mongoose.model('doctor_availabilities', DoctorAvailability);