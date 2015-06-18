var express = require('express');
var router = express.Router();
var Repeat = require('../models/repeat');

/* GET repeats listing. */
router.get('/', function(req, res, next) {
    Repeat.find().sort({weekDay: 'asc'}).exec().then(function(repeats) {
        res.send(repeats);
    }, function(error) {
        res.send(error);
    });
});

/* POST create a repeat. */
router.post('/', function(req, res, next) {
    var model = new Repeat(req.body);
    model.save().then(function(repeat) {
        res.send(repeat);
    }, function(error) {
        res.send(error);
    });
});

/* PUT update repeat. */
router.put('/:id', function(req, res, next) {
    Repeat.findByIdAndUpdate(req.params.id, req.body).exec().then(function(repeat) {
        res.send(repeat);
    }, function(error) {
        res.send(error);
    });
});

/* DELETE remove repeat. */
router.delete('/:id', function(req, res, next) {
    Repeat.remove({_id: req.params.id}).exec().then(function(repeat) {
        res.send(repeat);
    }, function(error) {
        res.send(error);
    });
});

module.exports = router;
