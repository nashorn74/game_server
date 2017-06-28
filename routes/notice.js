var express = require('express');
var router = express.Router();

//새소식 등록
router.post('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//새소식 조회
router.get('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//새소식 수정
router.put('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//새소식 삭제
router.delete('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//새소식 목록 조회
router.get('/list', function(req, res, next) {
	res.send(JSON.stringify({}));
});

module.exports = router;
