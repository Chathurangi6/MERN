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

router.post('/sendReport', (req, res) => {
    if (req.body.email === '') {
      res.status(400).send('email required');
    }
   // console.error(req.body.email);
   const email = req.body.email;
   const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `pamudikavindya4@gmail.com`,
        pass: `batti@123`,
    },
});

const mailOptions = {
    from: 'pamudikavindya4@gmail.com',
    to: req.body.sendingData[0],
    subject: 'Blood report',
    text: req.body.sendingData[1]
};

console.log('sending mail');

transporter.sendMail(mailOptions);
  });


module.exports = router;