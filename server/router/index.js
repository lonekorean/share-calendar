var express = require('express');
var expressHandlebars  = require('express-handlebars');
var expressSession = require('express-session');

module.exports = function(app) {
	app.engine('.hbs', expressHandlebars({
		extname: '.hbs',
		defaultLayout: '../../dist/server/views/layouts/page'
	}));
	app.set('view engine', '.hbs');
	app.set('views', './dist/server/views');

	app.use(expressSession({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true
	}));

	app.use('/', require('./routes/login'));
	app.use('/authentication', require('./routes/authentication'));
	app.use('/cal', require('./routes/cal'));
	app.use('/sharing', require('./routes/sharing'));
	app.use('/feed', require('./routes/feed'));

	app.use(express.static('./dist/client'));
};
