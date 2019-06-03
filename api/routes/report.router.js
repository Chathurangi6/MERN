const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');

const Report = mongoose.model('report');



router.route('/add').post(function (req, res) {
    req.body.state="pending"
    var currentDate = new Date();
    req.body.timestamp =  currentDate.toLocaleString();

    let report = new Report(req.body)
    report.save()
    res.status(200).send()

})

router.route('/get').get(function(req,res){
    Report.find({state:'pending'},
        function(err,report){
            if(!err){

                res.json(report)
            }
            else{
                res.status(500).res.send()
            }
        })

})

router.post('/results',function(req,res){
    // console.log(    req.body._id)
    Report.updateOne({_id:req.body._id},req.body,function(err,report){
            console.log(report)
    })
})

module.exports = router;