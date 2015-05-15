var express = require('express');
var router = express.Router();
var assignments = require('../models/assignment');
var moment = require('moment');

router.get('/', function(req, res, next) {
    assignments.find(function (err, assignments) {
        if (err) return next(err);
        res.json(assignments);
    });
});

/* GET /assignments listing. */
router.get('/search', function(req, res, next) {
    var startDate = moment(req.query.startDate).startOf('day');
    var endDate = moment(req.query.endDate).endOf('day');
    var order = req.query.order;
    var search = req.query.q;
    assignments.find({name: new RegExp(search, 'i'), date_completed: {$gte: startDate, $lte: endDate}}, null, {sort: {name: order}}, function (err, assignments) {
    if (err) return next(err);
    res.json(assignments);
  });
});
//, date_completed: {$gte: startDate.toDate, $lte: endDate.toDate}

/* POST /assignments */
router.post('/', function(req, res, next) {
  assignments.create(req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* GET /assignments/id */
//router.get('/:id', function(req, res, next) {
//  assignments.findById(req.params.id, function (err, assignment) {
//    if (err) return next(err);
//    res.json(assignment);
//  });
//});

/* PUT /assignments/:id */
router.put('/:id', function(req, res, next) {
  assignments.findByIdAndUpdate(req.params.id, req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* DELETE /assignments/:id */
router.delete('/:id', function(req, res, next) {
  assignments.findByIdAndRemove(req.params.id, req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

console.log('assignments route loaded');
module.exports = router;
