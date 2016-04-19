var express = require('express');

var router = express.Router();

router.post('/', function(req, res) {
	// normally some heavy duty authentication would happen here
	req.session.userId = 41;
	res.status(200).send();
});

module.exports = router;
