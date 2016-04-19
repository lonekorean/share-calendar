var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.userId) {
		// already logged in, carry on
		res.redirect('my-cal');
	} else {
		res.render('login');
	}
});

module.exports = router;
