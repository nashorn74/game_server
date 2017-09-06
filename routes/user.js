var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var tokenKey = "GAME_SERVER12345"; //토큰키

var getMySQL = require('./version.js').getMySQL;
var getMongoDB = require('./version.js').getMongoDB;
var connection = getMySQL();
var dbObj = getMongoDB();

//회원 가입
router.post('/', function(req, res, next) {
	var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
	var query = 'insert into user(name,email,password) values(?,?,?);';
	connection.query(query, [ req.body.name, req.body.email, hash ], 
		function (error, result) {
	  if (error) res.send(JSON.stringify({result:false,error:error}));
	  else res.send(JSON.stringify({result:true,message:result}));
	});
});

//회원 로그인
router.post('/login', function(req, res, next) {
	var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
	connection.query('select * from user where email=? and password=?', 
		[ req.body.email, hash ], function (error, results, fields) {
	  if (error) res.send(JSON.stringify({result:false, error:error}));
	  else {
	  	if (results.length > 0) {
	  		var payLoad  = {'user_id':results[0].id};
			var token = jwt.sign(payLoad,tokenKey,{
			    algorithm : 'HS256', //"HS256", "HS384", "HS512", "RS256", "RS384", "RS512" default SHA256
			    expiresIn : 1440 //expires in 24 hours
			});
			console.log("token : ", token);
			//decode 비동기처리
			/*jwt.verify(token,tokenKey,function(err,decoded){
				if (err) res.send(JSON.stringify({result:false, error:err}));
			    else res.send(JSON.stringify({token:token,decoded:decoded}));
			});*/
			connection.query('delete from user_login where user_id=?', 
				[results[0].id], function(err2, result2) {
				if (err2) res.send(JSON.stringify({result:false, error:err2}));
				else {
					connection.query('insert into user_login(user_id, token) values(?,?)', 
	  					[results[0].id, token], function(err, result) {
	  					if (err) res.send(JSON.stringify({result:false, error:err}));
	  					else res.send(JSON.stringify({result:true,token:token,message:result}));
	  				});
				}
			});
	  	} else {
	  		res.send(JSON.stringify({result:false, error:{message:'do not exists or wrong password'}}));
	  	}
	  }
	});
});

//회원 로그아웃
router.post('/logout', function(req, res, next) {
	connection.query('delete from user_login where token=?', 
		[req.body.token], function(err, result) {
		if (err) res.send(JSON.stringify({result:false, error:err}));
		else {
			res.send(JSON.stringify({result:true,message:result}))
		}
	});
});

//회원 정보 조회
router.get('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//회원 정보 수정
router.put('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//회원 정보 삭제
router.delete('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//회원 전체 목록 조회
router.get('/list', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//회원 랭킹 정보 조회
router.get('/ranking', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//회원 구매 정보 추가
router.post('/purchase', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//회원 구매 정보 조회
router.get('/purchase', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//캐릭터 생성
router.post('/character', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//캐릭터 정보 조회
router.get('/character', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//캐릭터 정보 수정
router.put('/character', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//캐릭터 정보 삭제
router.delete('/character', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//게임 플레이 정보 생성
router.post('/playlog', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//게임 플레이 정보 조회
router.get('/playlog', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//게임 플레이 정보 목록
router.get('/playlog/list', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//보유 아이템 정보 조회
router.get('/item', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//보유 아이템 사용/선물하기
router.put('/item', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//보유 아이템 목록 조회
router.get('/item/list', function(req, res, next) {
	res.send(JSON.stringify({}));
});

module.exports = router;
