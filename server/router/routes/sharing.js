var express = require('express');
var app = require('../../app');

var router = express.Router();

// find shares for a given userId
function findShares(userId) {
	shares = [];
	app.datastore.shares.forEach(function(element) {
		if (element.userId === userId) {
			shares.push(element);
		}
	});
	return shares;
}

router.get('/', function(req, res) {
	if (req.session.userId) {
		res.render('sharing', {
			customScript: 'sharing',
			shares: findShares(req.session.userId)
		});
	} else {
		res.redirect('/');
	}
});

module.exports = router;
