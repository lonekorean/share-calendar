var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.userId || req.query.sid) {
		res.render('cal', {
			customScript: 'cal',
			isAuthenticated: !req.query.sid
		});
	} else {
		res.redirect('/');
	}
});

module.exports = router;
