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

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// ROUTES
app.use('/patient',patientRoute);
app.use("/api/users", users);
app.use('/api/doctor',doctor);
app.use('/api/receptionist',receptionist);
app.use('/api/appointment',appoint)

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});