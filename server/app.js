var express = require('express');

if (process.env.ENVIRONMENT !== 'prod') {
	try {
		// attempt to load dev .env file
		require('../../.env');
	} catch (e) {
		throw 'Environment variables not found.';
	}
}

var app = module.exports = express();
var router = require('./router')(app);

// load up our demo data as a global var
// this is where real DB stuff would go, but it's just an app session for now
app.datastore = require('./datastore');

var server = app.listen(process.env.PORT, function() {
	console.log('Listening...');
});
