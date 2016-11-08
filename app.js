const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const app = express();

const PORT = 3000;

//template engine
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views');

//middleware
app.use(morgan('dev'));

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


//routing
app.get('/', function(req, res, next){
	let renderObj = {title: 'the Title', people: [{name: 'Hermione'}, {name: 'Gandolf'}, {name: 'Hodor'}]};
	res.render('index.html', renderObj, function(err, html) {
		if (err) throw err;
		res.send(html);
	});
});

app.get('/news/election', function(req ,res, next){
	res.send('some news!');
});




//listening PORT
app.listen(PORT, function(){
	console.log(`listening to ${PORT}!!`);
});