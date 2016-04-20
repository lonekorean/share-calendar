var express = require('express');
var bodyParser = require('body-parser');

if (process.env.ENVIRONMENT !== 'prod') {
	try {
		// attempt to load dev .env file
		require('../../.env');
	} catch (e) {
		throw 'Environment variables not found.';
	}
}

var app = module.exports = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// load up our demo data as a global var
// this is where real DB stuff would go, but it's just an app session for now
app.datastore = require('./datastore');

var router = require('./router')(app);

var server = app.listen(process.env.PORT, function() {
	console.log('Listening...');
});
