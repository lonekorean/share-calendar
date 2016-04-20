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
		var output = 'BEGIN:VCALENDAR\n' +
			'VERSION:2.0\n' +
			'PRODID:-//Coder\'s Block//NONSGML My Product//EN\n';

		events.forEach(function(element) {
			output += 'BEGIN:VEVENT\n' +
			'UID:' + element.uid + '\n' +
			'DTSTART:' + element.dtstart + '\n' +
			'DTEND:' + element.dtend + '\n' +
			'SUMMARY:' + element.summary + '\n' +
			'LOCATION:' + element.location + '\n' +
			'DESCRIPTION:' + element.description + '\n' +
			'END:VEVENT\n';
		});

		output += 'END:VCALENDAR';

		res.setHeader('Content-Type', 'text/calendar');
		res.render('feed', {
			layout: false,
			events: output
		});
	} else {
		res.status(404).send();
	}
});

module.exports = router;
