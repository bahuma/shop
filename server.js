// Load Express Server
var express = require('express');
var app = express();


// MongoDB Connection
var mongoose = require('mongoose');
var mongoOptions = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

mongoose.connect(process.env.DATABASE, mongoOptions);


// Load API Router
var apiRouter = require('./src/api/apiRouter.js');


// Frontend
app.use(express.static('src/frontend'));

// Backend
app.use('/admin', express.static('src/backend'));

// Bower components
app.use('/bower-components', express.static('bower_components'));

// API
app.use('/api', apiRouter);


// Start Server
var server = app.listen(process.env.PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Bahuma Shop listening at http://%s:%s', host, port);

});
