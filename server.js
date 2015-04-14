var express = require('express');
var app = express();
var apiRouter = require('./src/api/apiRouter.js');


app.use(express.static('src/frontend'));

app.use('/admin', express.static('src/backend'));

app.use('/api', apiRouter);


var server = app.listen(process.env.PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Bahuma Shop listening at http://%s:%s', host, port);

});
