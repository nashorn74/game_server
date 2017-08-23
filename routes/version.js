var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'game_server'
}); 
connection.connect();

//버전 정보 등록
router.post('/', function(req, res, next) {
	var query = 'insert into version(os, major, minor, build) values(?,?,?,?);';
	connection.query(query,
		[ req.body.os, req.body.major, req.body.minor, req.body.build ], 
		function (error, result) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else res.send(JSON.stringify({result:true,data:result}));
	});
});

//버전 정보 조회
router.get('/', function(req, res, next) {
	var query = 'select * from version where os=? order by created_at desc limit 1;';
	connection.query(query, [ req.query.os ], 
		function (error, results, fields) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else {
	  	if (results.length > 0) {
			res.send(JSON.stringify({result:true,data:results[0]}));
	  	} else {
	  		res.send(JSON.stringify({result:true,data:null}));
	  	}
	  }
	});
});

module.exports = router;
