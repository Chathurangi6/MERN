const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const passport = require("passport");
const patientRoute = require('./routes/patient.router');
const users = require('./routes/users')
const doctor = require('./routes/doctor.router')
const receptionist = require('./routes/receptionist.router')
const appoint =require('./routes/appoint.router')
const report = require('./routes/report.router')
const formidable = require('express-formidable');
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(formidable());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// ROUTES
app.use('/patient',patientRoute);
app.use("/api/users", users);
app.use('/api/doctor',doctor);
app.use('/api/receptionist',receptionist);
app.use('/api/appointment',appoint);
app.use('/api/report',report);
app.use(require('body-parser').urlencoded({extended:false}));
app.use(require('body-parser').json());
app.use(require('body-parser').text());

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});

