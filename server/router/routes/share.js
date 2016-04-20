var express = require('express');
var uuid = require('node-uuid');
var app = require('../../app');

var router = express.Router();

router.post('/create', function(req, res) {
	if (!req.session.userId) {
		// don't be naughty (forbidden)
		res.status(403).send();
	} else {
		var uid = uuid.v4();

		// save data
		app.datastore.shares.push({
			uid: uid,
			userId: req.session.userId,
			recipientEmail: req.body.recipientEmail,
			showEmails: req.body.showEmails === 'true',
			showWebinars: req.body.showWebinars === 'true',
			showEvents: req.body.showEvents === 'true',
			showSocial: req.body.showSocial === 'true',
			showCustom: req.body.showCustom === 'true'
		});

		// send email to recipient
		var mailOptions = {
		    from: process.env.EMAIL_FROM,
		    to: req.body.recipientEmail,
		    subject: 'Somone shared a calendar with you!',
		    text: 'Today is your lucky day!\n\n' +
				'View this calendar online at: ' +
				process.env.LINK_ROOT + 'cal?sid=' + uid + '\n\n' +
				'Or add this calendar to your favorite calendar client with this URL: ' +
				process.env.LINK_ROOT + 'feed/cal.ics?sid=' + uid + '\n\n'
		};
		app.transporter.sendMail(mailOptions, function(error, info){
		    if (error){
		        console.log(error);
		    } else {
		    	console.log('Email sent: ' + info.response);
			}
		});

		res.status(200).send();
	}
});

module.exports = router;
