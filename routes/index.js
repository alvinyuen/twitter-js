const express = require('express');
const router = express.Router();
const path = require('path');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');


// console.log(tweetBank.list());

// router.get('/css', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../public/stylesheets/style.css'));
// });


module.exports = function(io){
	console.log(io);

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm:true } );
});

router.get('/users/:name', function(req, res) {
  let name = req.params.name;
  let list = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: list, showForm: true, showUserName: true } );
});

router.get('/tweets/:id', function(req, res) {
  let tweetId = req.params.id;
  let tweet = tweetBank.find({tweetId: tweetId});
  res.render( 'index', {tweets: tweet, showForm: true});
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);

  io.sockets.emit('newTweet', { name:name , text:text });
  // res.redirect('/');
});

return router;

};
