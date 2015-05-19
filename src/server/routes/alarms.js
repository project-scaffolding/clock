var express = require('express');
var router = express.Router();
var Alarm = require('../models/alarm');

/* GET alarms listing. */
router.get('/', function(req, res, next) {
    Alarm.find().sort({hours: 'asc', minutes: 'asc'}).exec().then(function(alarms) {
        res.send(alarms);
    }, function(error) {
        res.send(error);
    });
});

/* GET alarm item */
router.get('/:id', function(req, res, next) {
    Alarm.find({_id: req.params.id}).exec().then(function(alarm) {
        res.send(alarm);
    }, function(error) {
        res.send(error);
    });
});

/* POST create an alarm. */
router.post('/', function(req, res, next) {
    var model = new Alarm(req.body);
    model.save().then(function(alarm) {
        res.send(alarm);
    }, function(error) {
        res.send(error);
    });
});

/* PUT update an alarm. */
router.put('/:id', function(req, res, next) {
    Alarm.findByIdAndUpdate(req.params.id, req.body).exec().then(function(alarm) {
        res.send(alarm);
    }, function(error) {
        res.send(error);
    });
});

/* DELETE remove alarm. */
router.delete('/:id', function(req, res, next) {
    Alarm.remove({_id: req.params.id}).exec().then(function(alarm) {
        res.send(alarm);
    }, function(error) {
        res.send(error);
    });
});

module.exports = router;
