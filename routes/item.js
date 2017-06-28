var express = require('express');
var router = express.Router();

//아이템 생성
router.post('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//아이템 정보 조회
router.get('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//아이템 정보 수정
router.put('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//아이템 삭제
router.delete('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//아이템 전체 목록 조회
router.get('/list', function(req, res, next) {
	res.send(JSON.stringify({}));
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
