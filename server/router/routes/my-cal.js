var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.userId) {
		// already logged in, carry on
		res.render('my-cal');
	} else {
		res.redirect('/');
	}
});

module.exports = router;
