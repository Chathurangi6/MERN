const express = require('express');
const patientRoutes = express.Router();

// Require Patient model in our routes module
let Patient = require('../models/patient.model');

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

//count number of patients
patientRoutes.route('/count').get(function(req,res){
  Patient.countDocuments({},function(err,users){
    if(err) res.json(err);
    else res.json(users);
  })
})

//get all details of a given patient
patientRoutes.route('/viewDetails').post(function(req,res){
  var paEmail=req.body.email;
  Patient.find({email:paEmail}, function (err, users) {
     // if (err) throw err;
     if(err){console.log(err)}
     res.json( users);
    
   })
 });
 
module.exports = patientRoutes;