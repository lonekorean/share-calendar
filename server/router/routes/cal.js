var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.userId || req.query.shareId) {
		res.render('cal');
	} else {
		res.redirect('/');
	}
});

module.exports = router;
