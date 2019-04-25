
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../DB");

const mongoose = require('mongoose');

// Load input validation
const validateRegisterInput = require("../validation/recep.validation");
const validateLoginInput = require("../validation/login");

// Load receptionist model
let Recep = require('../models/Receptionist');
const User = mongoose.model('users');

//send email password to user collection
// Doctor.find().forEach(
//   function(doc){
//     Users.update(
//       {_id: doc._id},
//       {$set: {fname: doc.fname,lname:doc.lname,email:doc.email,password:doc.password,userRoll:"D"}}
//     )
//   }     
// );

router.post("/register", (req, res) => {
  // Form validation
const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    
    if (user) {
      return res.status(400).json({ email: "Email already exists in users collection" });
    }
    else{

      const newUser = new User({
        fname:req.body.fname,
        lname:req.body.lname,
        email: req.body.email,
        password: req.body.password,
        userRoll:"R"
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          
        });
      });
    }
    
    })


  
    Recep.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } 
  const newUser = new Recep({
          fname: req.body.fname,
          lname: req.body.lname,
          dob: req.body.dob,
          phn_number : req.body.phn_number,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    );
  
  
});

// Defined get data(index or listing) route
router.route('/view').get(function (req, res) {
  Recep.find(function(err, users){
  if(err){
    console.log(err);
  }
  else {
    res.json(users);
  }
});
});

// Defined edit route
router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Recep.findById(id, function (err, recep){
      res.json(recep);
  });
});

//  Defined update route
router.route('/update/:id').post(function (req, res) {
  Recep.findById(req.params.id, function(err, recep) {
    if (!recep)
      res.status(404).send("data is not found");
    else {
      recep.fname = req.body.fname;
      recep.lname = req.body.lname;
      recep.email = req.body.email;
      recep.dob= req.body.dob;
      recep.phn_number=req.body.phn_number;
     // recep.password=req.body.password;

      recep.save().then(data => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
router.route('/delete/:id').get(function (req, res) {
  Recep.findByIdAndRemove({_id: req.params.id}, function(err, business){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

//count number of doctors
router.route('/count').get(function(req,res){
  Recep.countDocuments({},function(err,users){
    if(err) res.json(err);
    else res.json(users);
  })
})

module.exports = router;