var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//routes modules
var index = require('./routes/index');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

//routes declare
app.use('/', index);

//404 catch
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

var port = process.env.PORT || 5050;
app.set('port', port);

app.listen(app.get('port'), function() {
	console.log('App running at port: ' + app.get('port'));
});