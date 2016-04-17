var express = require('express');

if (process.env.ENVIRONMENT !== 'prod') {
	try {
		// attempt to load dev .env file
		require('../../.env');
	} catch (e) {
		throw 'Environment variables not found.';
	}
}

var app = express();
var router = require('./router')(app);

var server = app.listen(process.env.PORT, function() {
	console.log('Listening...');
});
