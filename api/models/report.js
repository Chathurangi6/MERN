const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const reportSchema = new Schema({
    pname:String,
    paddr:String,
    pemail:String,
    cbc:String,
    lpd:String,
    ura:String,
    fbs:String,
    ucl:String,
    state:String,
    timestamp:String
})  

module.exports = mongoose.model('report', reportSchema);