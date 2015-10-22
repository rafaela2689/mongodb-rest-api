var express = require('express');
var mongoskin = require('mongoskin');
var router = express.Router();

var db = mongoskin.db('mongodb://@localhost:27017/imdb', {safe:true});

/* GET all directors */
router.get('/', function(req, res, next) {

	db.collection('directors').find({}, {films: 0}).limit(100).toArray(function(err, directors) {
		if (err) {
			next(err);
		}
		res.status(200).send(directors);
	});
});

/* GET all directors with movies */
router.get('/movies', function(req, res, next) {

	db.collection('directors').find({}, {limit : 100}).toArray(function(err, directors) {
		if (err) {
			next(err);
		}
		res.status(200).send(directors);
	});
});

module.exports = router;
