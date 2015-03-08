
var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  console.log("Tweet: " + tweets[0].id);
  res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets } );
});

router.get('/users/:name/tweets/:id', function(req, res) {
  var name = req.params.name;
  var id = req.params.id;
  var tweets = tweetBank.find( {name: name, id: id} );
  res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets } );
});


module.exports = router;