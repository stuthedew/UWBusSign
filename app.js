
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var RED = require("node-red");

var databaseUrl = "data"; // "username:password@example.com/mydb"
var collections = ["data"]
var db = require("mongojs").connect(databaseUrl, collections);

// New Code
var mongo = require('mongodb');

var app = express();
app.locals.moment = require('moment');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var settings = {httpRoot:"/red", userDir:"node_modules/node-red", flowFile:"flows_bus_data.json"};

app.get('/', routes.index);
app.get('/busTimes', routes.busTimes(db));

var server = http.createServer(app);

RED.init(server,settings);
app.use(settings.httpRoot,RED.app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

RED.start();

