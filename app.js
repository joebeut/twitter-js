
var express = require( 'express' );
var morgan = require('morgan');
var swig = require('swig');

var app = express();

app.use(morgan('dev'));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

swig.setDefaults({ cache: false });



var routes = require('./routes/');
app.use('/', routes);



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
