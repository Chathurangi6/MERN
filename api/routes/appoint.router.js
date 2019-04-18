const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Appoint = mongoose.model('appointments');

// Appoint.find({ date: { $gte:ISODate("2013-11-19T14:00:00Z"), $lt: ISODate("2013-11-19T20:00:00Z") } })

router.route('/search').get(function (req, res) {
    Appoint.find({ $and: [{ date: req.body.appointDate }, { doctor: req.body.doctor }] },function(err, appoints){
        if(err){
          console.log(err);
        }
        else {
          res.json(appoints);
        }
    }

    )
}
)


router.route('/search').post(function (req, res) {
    var docName = req.body.docName; //userName = 'Juan David Nicholls';
    var searchString = new RegExp(docName, 'ig');
    appoint
  .match({ doctor: searchString })
  .exec(function (err, users) {
      if (err) throw err;
      res.json({
          users: users
      });
  });
  
  });
//add appointments
router.route('/add').post(function (req, res) {
  let appoint = new Appoint(req.body);
  appoint.save()
    .then(appoint => {
      res.status(200).json({'appoint': 'appointment is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

module.exports = router;