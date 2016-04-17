var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	res.render('shared-cal-data', { layout: false });
});

module.exports = router;
