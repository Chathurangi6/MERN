const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Appoint = mongoose.model('appointments');

Appoint.find({ date: { $gte:ISODate("2013-11-19T14:00:00Z"), $lt: ISODate("2013-11-19T20:00:00Z") } })