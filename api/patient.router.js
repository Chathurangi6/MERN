const express = require('express');
const patientRoutes = express.Router();

// Require Patient model in our routes module
let Patient = require('./patient.model');

// Defined store route
patientRoutes.route('/add').post(function (req, res) {
  let patient = new Patient(req.body);
  patient.save()
    .then(patient => {
      res.status(200).json({'patient': 'patient in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});
// Defined get data(index or listing) route
patientRoutes.route('/').get(function (req, res) {
  Patient.find(function(err, patients){
  if(err){
    console.log(err);
  }
  else {
    res.json(patients);
  }
});
});

module.exports = patientRoutes;