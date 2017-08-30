var express = require('express');
var router = express.Router();

var getMySQL = require('./version.js').getMySQL;
var getMongoDB = require('./version.js').getMongoDB;
var connection = getMySQL();
var dbObj = getMongoDB();

//아이템 생성
router.post('/', function(req, res, next) {
	var query = 'insert into '+ 
		'item(name,type,price,attack,defence,mp_spend,hp_recovery,mp_recovery,temp_attack,temp_defence) '+
		'values(?,?,?,?,?,?,?,?,?,?);';
	connection.query(query,
		[ 
			req.body.name, req.body.type, req.body.price, req.body.attack, req.body.defence,
			req.body.mp_spend, req.body.hp_recovery, req.body.mp_recovery, 
			req.body.temp_attack, req.body.temp_defence 
		], 
		function (error, result) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else res.send(JSON.stringify({result:true,message:result}));
	});
});

//아이템 정보 조회
router.get('/', function(req, res, next) {
	var query = 'select * from item where id=?;';
	connection.query(query, [ req.query.id ], 
		function (error, results, fields) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else {
	  	if (results.length > 0) {
			res.send(JSON.stringify({result:true,item:results[0]}));
	  	} else {
	  		res.send(JSON.stringify({result:true,item:null}));
	  	}
	  }
	});
});

//아이템 정보 수정
router.put('/', function(req, res, next) {
	var query = 'update item set ';
	var values = [];
	if (req.body.name != undefined && req.body.name != '' && req.body.name != null) {
		query += 'name=?,';
		values.push(req.body.name);
	}
	if (req.body.type != undefined && req.body.type != '' && req.body.type != null) {
		query += 'type=?,';
		values.push(req.body.type);
	}
	if (req.body.price != undefined && req.body.price != '' && req.body.price != null) {
		query += 'price=?,';
		values.push(req.body.price);
	}
	if (req.body.attack != undefined && req.body.attack != '' && req.body.attack != null) {
		query += 'attack=?,';
		values.push(req.body.attack);
	}
	if (req.body.defence != undefined && req.body.defence != '' && req.body.defence != null) {
		query += 'defence=?,';
		values.push(req.body.defence);
	}
	if (req.body.mp_spend != undefined && req.body.mp_spend != '' && req.body.mp_spend != null) {
		query += 'mp_spend=?,';
		values.push(req.body.mp_spend);
	}
	if (req.body.hp_recovery != undefined && req.body.hp_recovery != '' && req.body.hp_recovery != null) {
		query += 'hp_recovery=?,';
		values.push(req.body.hp_recovery);
	}
	if (req.body.mp_recovery != undefined && req.body.mp_recovery != '' && req.body.mp_recovery != null) {
		query += 'mp_recovery=?,';
		values.push(req.body.mp_recovery);
	}
	if (req.body.temp_attack != undefined && req.body.temp_attack != '' && req.body.temp_attack != null) {
		query += 'temp_attack=?,';
		values.push(req.body.temp_attack);
	}
	if (req.body.temp_defence != undefined && req.body.temp_defence != '' && req.body.temp_defence != null) {
		query += 'temp_defence=?,';
		values.push(req.body.temp_defence);
	}
	if (values.length > 0) {
		query = query.substring(0,query.length-1);
		query += ' where id=?;';
		values.push(req.body.id);
		connection.query(query, values, function (error, result) {
		  if (error) res.send(JSON.stringify({result:false,error:error}));
		  else {
		  	var query2 = 'select * from item where id=?;';
			connection.query(query2, [ req.body.id ], 
				function (error, results, fields) {
			  if (error) res.send(JSON.stringify({result:false,error:error}));
			  else {
			  	if (results.length > 0) {
					res.send(JSON.stringify({result:true,message:result,item:results[0]}));
			  	} else {
			  		res.send(JSON.stringify({result:true,message:result,item:null}));
			  	}
			  }
			});
		  }
		});
	} else {
		res.send(JSON.stringify({result:false,error:'parameter is not exists'}));
	}
	/**/
});

//아이템 삭제
router.delete('/', function(req, res, next) {
	var query = 'delete from item where id=?;';
	connection.query(query, [ req.body.id ], 
		function (error, result) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else res.send(JSON.stringify({result:true,message:result}));
	});
});

//아이템 전체 목록 조회
router.get('/list', function(req, res, next) {
	var query = 'select * from item order by id asc limit ? offset ?';
	if (req.query.sort == 'desc') 
		query = 'select * from item order by id desc limit ? offset ?';
	var limit = Number(req.query.count);
	var offset = limit * (Number(req.query.page)-1);
	if (offset < 0) offset = 0;
	connection.query(query, [ limit, offset ], 
		function (error, results, fields) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else res.send(JSON.stringify({result:true,item_list:results}));
	});
});

//아이템 판매 순위 조회
router.get('/ranking', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//아이템 구입 회윈 목록 조회
router.get('/users', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//아이템 좋아요 등록
router.post('/like', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//아이템 좋아요 삭제
router.delete('/like', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//아이템 좋아요 사용자 목록 조회
router.get('/like/users', function(req, res, next) {
	res.send(JSON.stringify({}));
});

module.exports = router;
