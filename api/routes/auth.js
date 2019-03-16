const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//bring in user model
require('../models/Users');
const Users=mongoose.model('users');

// Login process
router.post("/login", (req, res, next) => {
    const { errors, isValid } = validateLogin(req.body);
  
    // Login validation
    function validateLogin(data) {
      let errors = {};
  
      if (validator.isEmpty(data.email)) {
        errors.email = "email is required";
      }
      if (!validator.isEmail(data.email)) {
        errors.email = "email is not valid";
      }
      if (validator.isEmpty(data.password)) {
        errors.password = "password is required";
      }
      return {
        errors,
        isValid: isEmpty(errors)
      };
    }
  
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const email = req.body.email;
      const password = req.body.password;
  
      User.findOne({ email })
        .then(user => {
          // check for user
          if (!user) {
            errors.email = "User does not exist";
            return res.status(400).json(errors);
          } else {
            // check password
            bcrypt
              .compare(password, user.password)
              .then(isMatch => {
                if (isMatch) {
                  // user matched
                  const payload = {
                    id: user.id,
                    name: user.name,
                    role: user.role
                  };
                  // create JWT payload
                  // sign token
                  jwt.sign(
                    payload,
                    key.secretOrKey,
                    { expiresIn: 86400 },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "JWT " + token
                      });
                    }
                  );
                } else {
                  errors.password = "Password incorrect";
                  return res.status(400).json(errors);
                }
              })
              .catch(ex => {
                return res.status(500).send("Something went wrong");
              });
          }
        })
        .catch(ex => {
          return res.status(500).send("Something went wrong");
        });
    }
  });
  
  
  
  module.exports = router;