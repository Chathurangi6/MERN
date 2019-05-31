
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const multer = require('multer');
var app=express();

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


//get all doctors 
router.route('/name').get(function (req, res) {
  Doctor.aggregate()
    .project({fullname: { $concat: ['$fname', ' ', '$lname'] },email:'$email',time: '$time_slots'
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

//get available time slots 
router.route('/viewTime').post(function(req,res){
 var docEmail=req.body.email;
  Doctor.find({email:docEmail}, function (err, users) {
    // if (err) throw err;
    if(err){console.log(err)}
    res.json( users);
   
  })
});


//image uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/images');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      // rejects storing a file
      cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.route("/uploadmulter")
    .post(upload.single('imageData'), (req, res, next) => {
        console.log(req.body);
        const newImage = new Doctor({
            imageName: req.body.imageName,
            imageData: req.file.path
        });

        newImage.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });



module.exports = router;