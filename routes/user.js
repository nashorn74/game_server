var express = require('express');
var router = express.Router();

//회원 가입
router.post('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//회원 로그인
router.post('/login', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//회원 로그아웃
router.post('/logout', function(req, res, next) {
	res.send(JSON.stringify({}));
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
