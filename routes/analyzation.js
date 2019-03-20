var express = require('express');
var router = express.Router();

var getMySQL = require('./version.js').getMySQL;
var getMongoDB = require('./version.js').getMongoDB;
var connection = getMySQL();
var dbObj = getMongoDB();

// 처리할 데이터를 추가한다.
router.get('/add', function(req, res, next) {
	var dbObj = getMongoDB();
	var collection = dbObj.collection('words');
	collection.save({sentence:'read a book'}, function(err, result) {
		collection.save({sentence:'write a book'}, function(err, result) {
			res.send(JSON.stringify(result));
		})
	})
})

// 저장된 데이터를 조회한다.
router.get('/words', function(req, res, next) {
	var dbObj = getMongoDB();
	var collection = dbObj.collection('words');
	collection.find({}).toArray(function(err, results) {
		res.send(JSON.stringify(results));
	})
})

// 주어진 문장을 공백으로 구분하여 단어를 추출하고 count 값으로 1을 지정하여 결과를 전달한다.
var	map = function() {
	var res = this.sentence.split(' ');
	for (var i in res) {
		key = { word: res[i] };
		value = { count: 1 };
		emit(key,value);
	}
}

// 전달 받은 임의의 키에 대한 값들에서 count 값을 꺼내서 모두 더한 다음 총합을 리턴한다.
var reduce = function(key, values) {
	var totalcount = 0;
	for (var i in values) {
		totalcount = values[i].count + totalcount;
	}
	return {count: totalcount};
}

// 저장된 데이터와 정의된 함수들을 이용하여 맵리듀스를 수행한다.
router.get('/wordcount', function(req, res, next) {
	var dbObj = getMongoDB();
	var collection = dbObj.collection('words');
	collection.mapReduce(
		map, reduce, { out: 'wordcount' },
		function(err, result_collection) {
			// 맵리듀스 수행 결과 만들어진 컬랙션에서 전체 조회를 실행한다.
			result_collection.find().toArray(function(err, results) {
				var query = 'insert into word_count(key,value) values(?,?);';
				// 결과를 MySQL의 word_count 테이블에 저장한다.
				for (var i in results) {
					connection.query(query,
						[ results[i]._id.word, results[i].value.count ], function (error, result) {
					  if (error) console.log(error)
					  else console.log(result)
					});
				}
				// 결과를 리턴한다.
				res.send(JSON.stringify(results));
			});
		}
	);
})

module.exports = router;