var express = require('express');
var router = express.Router();

var getMySQL = require('./version.js').getMySQL;
var getMongoDB = require('./version.js').getMongoDB;
var connection = getMySQL();
var dbObj = getMongoDB();

router.get('/add', function(req, res, next) {
	var dbObj = getMongoDB();
	var collection = dbObj.collection('words');
	collection.save({sentence:'read a book'}, function(err, result) {
		collection.save({sentence:'write a book'}, function(err, result) {
			res.send(JSON.stringify(result));
		})
	})
})

router.get('/words', function(req, res, next) {
	var dbObj = getMongoDB();
	var collection = dbObj.collection('words');
	collection.find({}).toArray(function(err, results) {
		res.send(JSON.stringify(results));
	})
})

var	map = function() {
	var res = this.sentence.split(' ');
	for (var i in res) {
		key = { word: res[i] };
		value = { count: 1 };
		emit(key,value);
	}
}

var reduce = function(key, values) {
	var totalcount = 0;
	for (var i in values) {
		totalcount = values[i].count + totalcount;
	}
	return {count: totalcount};
}

router.get('/wordcount', function(req, res, next) {
	var dbObj = getMongoDB();
	var collection = dbObj.collection('words');
	collection.mapReduce(
		map, reduce, { out: 'wordcount' },
		function(err, result_collection) {
			result_collection.find().toArray(function(err, results) {
				res.send(JSON.stringify(results));
			});
		}
	);
})

module.exports = router;