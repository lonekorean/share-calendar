var express = require('express');
var uuid = require('node-uuid');
var app = require('../../app');

var router = express.Router();

router.post('/create', function(req, res) {
	if (!req.session.userId) {
		// don't be naughty (forbidden)
		res.status(403).send();
	} else {
		app.datastore.shares.push({
			uid: uuid.v4(),
			userId: req.session.userId,
			recipientEmail: req.body.recipientEmail === 'true',
			showEmails: req.body.showEmails === 'true',
			showWebinars: req.body.showWebinars === 'true',
			showEvents: req.body.showEvents === 'true',
			showSocial: req.body.showSocial === 'true',
			showCustom: req.body.showCustom === 'true'
		});

		res.status(200).send();
	}
});

module.exports = router;
