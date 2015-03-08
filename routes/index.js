
var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function (io) {

	router.post('/submit', function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  tweetBank.add(name, text);
	  io.sockets.emit('new_tweet', { name: name, text: text });
	  res.redirect('/');
	});

	router.get('/', function (req, res) {
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	});

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  var tweets = tweetBank.find( {name: name} );
	  res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets, name: name, showName: true } );
	});

	router.get('/users/:name/tweets/:id', function(req, res) {
	  var name = req.params.name;
	  var id = req.params.id;
	  var tweets = tweetBank.find( {name: name, id: id} );
	  res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets } );
	});

	return router;

};