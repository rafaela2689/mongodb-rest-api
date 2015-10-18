var express = require('express');
var mongoskin = require('mongoskin');
var async = require('async');
var router = express.Router();

var db = mongoskin.db('mongodb://@localhost:27017/imdb', {safe:true});

/* GET movies with directors, roles and actors */
router.get('/', function(req, res, next) {

	db.collection('movies').find({}, {limit : 100}).toArray(function(err, movies) {
		if (err) {
			console.log(err);
			throw err;
		}
		res.status(200).send(movies);
	});
});

/* GET movies with directors */
router.get('/directors', function(req, res, next) {

	db.collection('movies').find({}, { roles:0 }).limit(100).toArray(function(err, movies) {
		if (err) {
			console.log(err);
			throw err;
		}
		res.status(200).send(movies);
	});
});

/* GET movies with roles */
router.get('/roles', function(req, res, next) {

	db.collection('movies').find({}, { directors:0 }).limit(100).toArray(function(err, movies) {
		if (err) {
			console.log(err);
			throw err;
		}
		res.status(200).send(movies);
	});
});

router.post('/', function(req, res, next) {
	db.collection('movies').insert(req.body, {}, function(err, result) {
		if (err) {
			console.log(err);
			throw err;
		}

		res.status(201).send({message: 'Movie added with success!'});
	});
});

router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	var data = { year : req.body.year };
	db.collection('movies').update({_id: 5}, {$set: data}, function(err, result) {
		if (err) {
			console.log(err);
			throw err;
		}

		console.log(result);

		res.status(200).send({message: 'Movie updated with success!'});
	});
});

router.delete('/:id', function(req, res, next) {
	db.collection('movies').remove({_id: 5}, function(err, result) {
		if (err) {
			console.log(err);
			throw err;
		}

		res.status(200).send({message: 'Movie deleted with success!'});
	});
});

module.exports = router;
