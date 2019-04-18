
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

// Load input validation
const validateRegisterInput = require("../validation/register");

// Load doctor model

const Doctor = mongoose.model('doctors');
const User = mongoose.model('users');



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
        email: req.body.email,
        password: req.body.password,
        userRoll:"D"
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

  Doctor.findOne({ email: req.body.email }).then(user => {
    
    if (user) {
      return res.status(400).json({ email: "Email already exists in Doctor collection" });
    }
    else{

      const newDoc = new Doctor({
        fname: req.body.fname,
        lname: req.body.lname,
        specialist: req.body.specialist,
        phn_number : req.body.phn_number,
        email: req.body.email,
        password: req.body.password
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newDoc.password, salt, (err, hash) => {
          if (err) throw err;
          newDoc.password = hash;
          newDoc
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          
        });
      });
    }
    
    }
  );
});

// Defined get data(index or listing) route
router.route('/view').get(function (req, res) {
  Doctor.find(function(err, doctors){
  if(err){
    console.log(err);
  }
  else {
    res.json(doctors);
  }
});
});

//get only doctor name
// router.route('/name').post(function (req, res) {
//   var userName = req.body.search; //userName = 'Juan David Nicholls';
//   var searchString = new RegExp(userName, 'ig');
//   Doctor.aggregate()
//     .project({fullname: { $concat: ['$fname', ' ', '$lname'] }
// })
// .match({ fullname: searchString })
// .exec(function (err, users) {
//     if (err) throw err;
    
//     res.json({
//         users: users
//     });
// });

// });

router.route('/name').get(function (req, res) {
  Doctor.aggregate()
    .project({fullname: { $concat: ['$fname', ' ', '$lname'] }
}).exec(function(err,name){
  if(err){
    console.log(err);
  }
  else {
    
    res.json(name);
    console.log(name);
  }
})
}) 

// Defined edit route
router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Doctor.findById(id, function (err, data){
      res.json(data);
  });
});

//  Defined update route
router.route('/update/:id').post(function (req, res) {
  Doctor.findById(req.params.id, function(err, recep) {
    if (!recep)
      res.status(404).send("data is not found");
    else {
      Doctor.fname = req.body.fname;
      Doctor.lname = req.body.lname;
      Doctor.email = req.body.email;
      Doctor.specialist= req.body.specialist;
      Doctor.phn_number=req.body.phn_number;
      Doctor.password=req.body.password;

      Doctor.save().then(data => {
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
  Doctor.findByIdAndRemove({_id: req.params.id}, function(err, business){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

//count number of doctors
router.route('/count').get(function(req,res){
  Doctor.countDocuments({},function(err,doctors){
    if(err) res.json(err);
    else res.json(doctors);
  })
})

module.exports = router;