"use strict";

var express = require('express');
var http = require('http');
var compression = require('compression');
var app = express();
var ejs = require('ejs');
var port = process.env.PORT || 5000;

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/dist');
app.use(compression());

// app specific routes
require('./routes')(app);

// static routes
app.use(express.static(__dirname + '/dist/'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));
app.use('/img', express.static(__dirname + '/dist/img'));

// not found
app.use((req, res) => {
  res.sendStatus(404);
});

var server = http.createServer(app);
server.listen(port);
console.info(`--- server started on port ${port}`);
