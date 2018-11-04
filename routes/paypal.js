var express = require('express');
var router = express.Router();

var paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'AVOhuWQCO6qFZfGwj1d3YioKBv9isP0_QyrF9dntW1fUFkT0ymWWNz0G114ev3RByKXwdANLSVRxpt0v',
  'client_secret': 'ELD7Vf6WcNwba7xTEDWeU6Q0uTiV5FzPM9LZaVRsH2CprV_bPT6qTohOk1_nzRiAcklLauP-ct0Uy6nB'
});

// 테스트용 카드 정보
var card_data = {
  "type": "visa",
  "number": "4417119669820331",
  "expire_month": "11",
  "expire_year": "2018",
  "cvv2": "123",
  "first_name": "Joe",
  "last_name": "Shopper"
};
 
router.post('/test/card', function(req, res, next) {
	paypal.creditCard.create(card_data, function(error, credit_card){
		if (error) {
			console.log(error);
			res.send(JSON.stringify(error));
		} else {
			console.log("Create Credit-Card Response");
			console.log(credit_card);
			res.send(JSON.stringify(credit_card));
		}
	})
});

// 페이팔 인증 정보
var config = {
  "port" : 5000,
  "api" : {
    "host" : "api.sandbox.paypal.com",
    "port" : "",            
    "client_id" : 'AVOhuWQCO6qFZfGwj1d3YioKBv9isP0_QyrF9dntW1fUFkT0ymWWNz0G114ev3RByKXwdANLSVRxpt0v',  // your paypal application client id
    "client_secret" : 'ELD7Vf6WcNwba7xTEDWeU6Q0uTiV5FzPM9LZaVRsH2CprV_bPT6qTohOk1_nzRiAcklLauP-ct0Uy6nB' // your paypal application secret id
  }
}
paypal.configure(config.api);
var Session = require('express-session');
var Session = Session({
    secret:'secrettokenhere',
    saveUninitialized: true,
	resave: true
});
var sessionInfo = {
	paypalData : null,
	clientData : null
};

router.post('/test/payment', function(req, res, next) {
	console.log(req.body.price);
	console.log(req.body.product_name);
	var response ={};
	// 결제 JSON 생성
	const payment = {
		"intent": "authorize",
		"payer": {
			"payment_method": "paypal"
		},
		"redirect_urls": {
			"return_url": "http://127.0.0.1:3000/paypal/test/execute",
			"cancel_url": "http://127.0.0.1:3000/paypal/test/cancel"
		},
		"transactions": [{
			"amount": {
				"total": req.body.price,
				"currency": "USD"
			},
			"description": req.body.product_name
		}]
	};

	// 페이팔 결제 생성
	paypal.payment.create(payment, function (error, payment) {
		if (error) {
			console.log(error);
			res.send(JSON.stringify(error));
		} else {
	    	if(payment.payer.payment_method === 'paypal') {
	    		response.paymentId = payment.id;
	    		var redirectUrl;
	    		response.payment = payment;
	    		for(var i=0; i < payment.links.length; i++) {
	    			var link = payment.links[i];
	    			if (link.method === 'REDIRECT') {
	    				redirectUrl = link.href;
	    			}
	    		}
	    		response.redirectUrl = redirectUrl;
	    	}
	    	sessionInfo.paypalData = response;
			sessionInfo.clientData = req.body;
			res.redirect(response.redirectUrl);
	    }
	});
});

// 결제 성공 URL
router.get('/test/execute',function(req, res){	
	var response = {};
	const PayerID = req.query.PayerID;
	const serverAmount = parseFloat(sessionInfo.paypalData.payment.transactions[0].amount.total);
	const clientAmount = parseFloat(sessionInfo.clientData.price);
	const paymentId = sessionInfo.paypalData.paymentId;
	const details = {
		"payer_id": PayerID 
	};
	response.userData= {
		userID : "test1234",
		name : "홍길동"
	};
	if (serverAmount !== clientAmount) {
		response.error = true;
		response.message = "Payment amount doesn't matched.";
		res.send(JSON.stringify({response : response}));
	} else{
		paypal.payment.execute(paymentId, details, function (error, payment) {
			if (error) {
				console.log(error);
				response.error = true;
				response.message = "Payment unsuccessful.";
				res.send(JSON.stringify({response : response}));
			} else {
				response.error = false;
				response.message = "Payment Successful.";
				res.send(JSON.stringify({response : response}));				
			};
		});
	};
});

// 결제 실패 URL
router.get('/test/cancel',function(req, res){
	var response ={};
	response.error = true;
	response.message = "Payment unsuccessful.";
	response.userData = {
		name : "홍길동"
	};
	res.send(JSON.stringify({response : response}));
});

module.exports = router;