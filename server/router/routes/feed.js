var express = require('express');
var app = require('../../app');

// quick and dirty polyfill to find an object in an array with a prop value
function findIn(array, prop, value) {
	var foundElement;
	array.forEach(function(element) {
		if (element[prop] === value) {
			foundElement = element;
		}
	});
	return foundElement;
}

// logic to load events from the data store
function loadEvents(sessionUserId, shareId) {
	var userId;
	var calendar;

	// figure out what userId to use
	if (shareId) {
		// attempt to get userId via shareId
		var share = findIn(app.datastore.shares, 'uid', shareId);
		if (share) {
			userId = share.userId;
		}
	} else if (sessionUserId) {
		// if user is authenticated, use their userId
		userId = sessionUserId;
	}

	if (userId) {
		// find calendar data for the user
		calendar = findIn(app.datastore.calendars, 'userId', userId);
		if (calendar) {
			return calendar.events;
		}
	}
}

var router = express.Router();

router.get('/cal.json', function(req, res) {
	var events = loadEvents(req.session.userId, req.query.sid);
	if (events) {
		res.render('feed', {
			layout: false,
			events: JSON.stringify(events)
		});
	} else {
		res.status(404).send();
	}
});

router.get('/cal.ics', function(req, res) {
	var events = loadEvents(req.session.userId, req.query.sid);
	if (events) {
		res.render('feed', {
			layout: false,
			events: JSON.stringify(events)
		});
	} else {
		res.status(404).send();
	}
});

module.exports = router;
