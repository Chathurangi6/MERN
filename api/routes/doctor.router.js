
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../DB");

const mongoose = require('mongoose');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load doctor model

const Doctor = mongoose.model('doctors');


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
  Doctor.findOne({ email: req.body.email }).then(user => {
    console.log(req.body.email,Doctor,user);
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
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


//login validation
// router.post("/login", (req, res) => {
//     // Form validation
//   const { errors, isValid } = validateLoginInput(req.body);
//   // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//   const email = req.body.email;
//     const password = req.body.password;
//   // Find user by email
//     User.findOne({ email }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ emailnotfound: "Email not found" });
//       }
//   // Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };
//   // Sign token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               });
//             }
//           );
//           // render() {
//           //   return(
//           //     <Dashboard/>
//           //   );
//           // }
//         } else {
//           return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//       });
//     });
//   });

module.exports = router;