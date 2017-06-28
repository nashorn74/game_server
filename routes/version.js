var express = require('express');
var router = express.Router();

//버전 정보 등록
router.post('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

//버전 정보 조회
router.get('/', function(req, res, next) {
	res.send(JSON.stringify({}));
});

module.exports = router;
