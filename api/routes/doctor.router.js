
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const multer = require('multer');

// Load input validation
const validateRegisterInput = require("../validation/doctor.validation");

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
        fname:req.body.fname,
        lname:req.body.lname,
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

//get all doctors 
router.route('/name').get(function (req, res) {
  Doctor.aggregate()
    .project({fullname: { $concat: ['$fname', ' ', '$lname'] },email:'$email'
}).exec(function(err,name){
  if(err){
    console.log(err);
  }
  else {
    
    res.json(name);
    
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
  Doctor.findById(req.params.id, function(err, doctor) {
    if (!doctor)
      res.status(404).send("data is not found");
    else {
      doctor.fname = req.body.fname;
      doctor.lname = req.body.lname;
      doctor.email = req.body.email;
      doctor.specialist= req.body.specialist;
      doctor.phn_number=req.body.phn_number;
     // Doctor.password=req.body.password;

      doctor.save().then(data => {
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


// SET STORAGE
var storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage });

//upload photo
router.post('/uploadphoto', upload.single('picture'), (req, res) => {
  var img = fs.readFileSync(req.file.path);
var encode_image = img.toString('base64');
// Define a JSONobject for the image attributes for saving to database

var finalImg = {
    contentType: req.file.mimetype,
    image:  new Buffer(encode_image, 'base64')
 };
Doctor.insertOne(finalImg, (err, result) => {
  console.log(result)

  if (err) return console.log(err)

  console.log('saved to database')
  res.redirect('/')
 
   
})
})

//get photo
router.get('/photo/:id', (req, res) => {
  var filename = req.params.id;
   
  Doctor.findOne({'_id': ObjectId(filename) }, (err, result) => {
   
      if (err) return console.log(err)
   
     res.contentType('image/jpeg');
     res.send(result.image.buffer)
     
      
    })
  })

module.exports = router;