
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../DB");
const mongoose = require('mongoose');
const nodemailer =require('nodemailer')
const crypto = require("crypto-js")
// Load input validation
const validateLoginInput = require("../validation/login");
// Load User model
const User = mongoose.model('users');
const BCRYPT_SALT_ROUNDS = 12;

//login validation
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
    // const userRoll =req.body.userRoll;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            userRoll: user.userRoll
          };


  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
          
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  // Defined get data(index or listing) route
  router.route('/').get(function (req, res) {
    User.find(function(err, users){
  if(err){
    console.log(err);
  }
  else {
    res.json(users);
  }
});
});

const randomString=length=>{
  let text="";
  const possible="abcdefghijklmnopqrstuvwxyz0123456789_-.";
  for(let i=0;i<length;i++){
    text+=possible.charAt(Math.floor(Math.random()*possible.length));
  }
  return text;
}

router.post('/forgotPassword', (req, res) => {
  if (req.body.email === '') {
    res.status(400).send('email required');
  }
 // console.error(req.body.email);
 const email = req.body.email;
 User.findOne({ email }).then(user => {
  // Check if user exists
  if (!user) {
    return res.status(404).json({ emailnotfound: "Email not found" });
  }
     else {
      const token = randomString(40);
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `pamudikavindya4@gmail.com`,
          pass: `batti@123`,
        },
      });

      const mailOptions = {
        from: 'pamudikavindya4@gmail.com',
        to: `${user.email}`,
        subject: 'Link To Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
          + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
          + `http://localhost:4000/api/users/reset/${token}\n\n`
          + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  });
});

router.get('/reset', (req, res) => {
  User.findOne({
    where: {
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    },
  }).then((user) => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send('password reset link is invalid or has expired');
    } else {
      res.status(200).send({
        email: user.email,
        message: 'password reset link a-ok',
      });
    }
  });
});

router.put('/updatePasswordViaEmail', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    },
  }).then(user => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send('password reset link is invalid or has expired');
    } else if (user != null) {
      console.log('user exists in db');
      bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
          user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
          });
        })
        .then(() => {
          console.log('password updated');
          res.status(200).send({ message: 'password updated' });
        });
    } else {
      console.error('no user exists in db to update');
      res.status(401).json('no user exists in db to update');
    }
  });
});

router.put('/updatePassword', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else {
      User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((userInfo) => {
        if (userInfo != null) {
          console.log('user found in db');
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
              userInfo.update({
                password: hashedPassword,
              });
            })
            .then(() => {
              console.log('password updated');
              res
                .status(200)
                .send({ auth: true, message: 'password updated' });
            });
        } else {
          console.error('no user exists in db to update');
          res.status(404).json('no user exists in db to update');
        }
      });
    }
  })(req, res, next);
});

module.exports = router;