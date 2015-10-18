var express = require('express');
var mongoskin = require('mongoskin');
var router = express.Router();

var db = mongoskin.db('mongodb://@localhost:27017/imdb', {safe:true});

/* GET users listing. */
router.get('/', function(req, res, next) {

	db.collection('actors').find({}, {limit : 100}).toArray(function(err, actors) {
		if (err) {
			console.log(err);
			throw err;
		}
		res.status(200).send(actors);
	});
});

module.exports = router;