
var express = require( 'express' );
var morgan = require('morgan');
var swig = require('swig');

var app = express();

app.use(morgan('dev'));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views');

swig.setDefaults({ cache: false });



app.get('/', function (req, res) {

  var people = [{name: 'Michael Phelps'}, {name: 'Ian Thorpe'}, {name: 'Joe Beutler'}];
  res.render('index', {title: 'Hall of Fame', people: people} );
});

app.get('/news', function (req, res) {
  res.send('Nothing to report today. Please try back next year.')
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
