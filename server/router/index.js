var express = require('express');
var expressHandlebars  = require('express-handlebars');
var expressSession = require('express-session');

module.exports = function(app) {
	app.engine('.hbs', expressHandlebars({ extname: '.hbs' }));
	app.set('view engine', '.hbs');
	app.set('views', './dist/server/views');

	app.use(expressSession({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

	app.use('/', require('./routes/login'));
	//app.use('/my-cal', require('./routes/my-cal'));
	//app.use('/manage', require('./routes/manage'));
	//app.use('/shared-cal', require('./routes/shared-cal-web'));
	//app.use('/shared-cal.ics', require('./routes/shared-cal-data'));
	app.use(express.static('./dist/client'));
};
