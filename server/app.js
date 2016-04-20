var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

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

// reusable transport for EMAIL_TRANSPORT_STRING
app.transporter = nodemailer.createTransport(process.env.EMAIL_TRANSPORT_STRING);

var router = require('./router')(app);

var server = app.listen(process.env.PORT, function() {
	console.log('Listening...');
});
