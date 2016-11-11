const express = require('express');
const router = express.Router();
const path = require('path');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
const client = require('../db/index');


// console.log(tweetBank.list());

// router.get('/css', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../public/stylesheets/style.css'));
// });


module.exports = function(io){
	console.log(io);

//root index page
router.get('/', function (req, res) {

  client.query('SELECT users.pictureurl, users.name, tweets.content, tweets.id FROM tweets JOIN users ON users.id = tweets.userid', function(err, result){
    if(err) return next(err);
    var tweets = result.rows;
    // console.log(tweets);
    res.render( 'index', { tweets: tweets, showForm:true } );
  });
});

//particular user tweets
router.get('/users/:name', function(req, res) {
  let name = req.params.name;
  client.query('SELECT users.pictureurl, users.name, tweets.content FROM tweets JOIN users ON users.id = tweets.userid WHERE users.name=$1', [name], function (err, result){
    if (err) return next(err);
    var tweets = result.rows;
  res.render( 'index', { tweets: tweets, showForm: true, showUserName: true } );
  });
  // let list = tweetBank.find( {name: name} );
});

//individual tweets
router.get('/tweets/:id', function(req, res) {
  let tweetId = req.params.id;
  // let tweet = tweetBank.find({tweetId: tweetId});
  client.query('SELECT users.pictureurl, tweets.content FROM tweets JOIN users on users.id = tweets.userid WHERE tweets.id=$1', [tweetId], function(err, result){
    if (err) return next(err);
    var tweets = result.rows;
  res.render( 'index', {tweets: tweets, showForm: true});
  });
});

router.post('/tweets', function(req, res) {

  var name = req.body.name;
  var text = req.body.text;
  client.query('SELECT users.id FROM users WHERE users.name=$1', [name], function(err, result){
    if (err) return next(err); 
      if(!result.rows.length){
        client.query('INSERT into users (name) VALUES ($1)', [name], function(err, result){
              console.log('result:',result);
              // var id = result.rows[0].id;
              client.query('SELECT users.id FROM users Where users.name=$1', [name], function(err, result){
                var id = result.rows[0].id;
                 client.query('INSERT into tweets (userid, content) VALUES ($1, $2)', [id, text], function(err, result){
                    io.sockets.emit('newTweet', { id:id, name:name, text:text });             
                });
               });
        });
      }
      else{
        var id = result.rows[0].id;
        console.log('id:',id);
        client.query('INSERT into tweets (userid, content) VALUES ($1, $2)', [id, text], function(err, result){
            io.sockets.emit('newTweet', { id:id, name:name, text:text });
        });
      }

  });
  // tweetBank.add(name, text);


});

return router;

};
