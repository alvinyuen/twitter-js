const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

const app = express();

const PORT = 3000;

//template engine
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {
	noCache: true
});


//listening PORT
let server = app.listen(PORT, function() {
	console.log(`listening to ${PORT}!!`);
});

//have socketio listen to server
let io = socketio.listen(server);



//middleware
app.use(morgan('dev'));

//url-encoded & JSON parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routing middleware
app.use('/', routes(io));

//static files routes
app.use('/', express.static(path.join(__dirname, 'public')));


// app.use('/', function(req, res, next){
// 	console.log('GET /');
// 	res.status(200);
// 	next();
// 	console.log('GET /'+res.status());
// });


// app.use('/news', function(req, res, next) {
// 	console.log('GET /news');
// 	next();
// });



// app.get('/', function(req, res, next){
// 	let renderObj = {title: 'the Title', people: [{name: 'Hermione'}, {name: 'Gandolf'}, {name: 'Hodor'}]};
// 	res.render('index.html', renderObj, function(err, html) {
// 		if (err) throw err;
// 		res.send(html);
// 	});
// });

// app.get('/news/election', function(req ,res, next){
// 	res.send('some news!');
// });




