var express = require('express');
var router = express.Router();

var getMySQL = require('./version.js').getMySQL;
var getMongoDB = require('./version.js').getMongoDB;
var connection = getMySQL();
var dbObj = getMongoDB();

//새소식 등록
router.post('/', function(req, res, next) {
	var query = 'insert into notice(title, content) values(?,?);';
	connection.query(query,
		[ req.body.title, req.body.content ], 
		function (error, result) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else res.send(JSON.stringify({result:true,message:result}));
	});
});

//새소식 조회
router.get('/', function(req, res, next) {
	var query = 'select * from notice where id=?;';
	connection.query(query, [ req.query.id ], 
		function (error, results, fields) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else {
	  	if (results.length > 0) {
			res.send(JSON.stringify({result:true,notice:results[0]}));
	  	} else {
	  		res.send(JSON.stringify({result:true,notice:null}));
	  	}
	  }
	});
});

//새소식 수정
router.put('/', function(req, res, next) {
	var query = 'update notice set title=?,content=? where id=?;';
	connection.query(query,
		[ req.body.title, req.body.content, req.body.id ], 
		function (error, result) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else {
	  	var query2 = 'select * from notice where id=?;';
		connection.query(query2, [ req.body.id ], 
			function (error, results, fields) {
		  if (error) res.send(JSON.stringify({result:false,error:error}));
		  else {
		  	if (results.length > 0) {
				res.send(JSON.stringify({result:true,message:result,notice:results[0]}));
		  	} else {
		  		res.send(JSON.stringify({result:true,message:result,notice:null}));
		  	}
		  }
		});
	  }
	});
});

//새소식 삭제
router.delete('/', function(req, res, next) {
	var query = 'delete from notice where id=?;';
	connection.query(query, [ req.body.id ], 
		function (error, result) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else res.send(JSON.stringify({result:true,message:result}));
	});
});

//새소식 목록 조회
router.get('/list', function(req, res, next) {
	var query = 'select * from notice order by id desc limit ? offset ?';
	var limit = Number(req.query.count);
	var offset = limit * (Number(req.query.page)-1);
	if (offset < 0) offset = 0;
	connection.query(query, [ limit, offset ], 
		function (error, results, fields) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else res.send(JSON.stringify({result:true,notice_list:results}));
	});
});

module.exports = router;
