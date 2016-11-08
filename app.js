const express = require('express');
const morgan = require('morgan');

const app = express();

const PORT = 3000;



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

	res.send('Welcome!');
});

app.get('/news/election', function(req ,res, next){
	res.send('some news!');
});




//listening PORT
app.listen(PORT, function(){
	console.log(`listening to ${PORT}!!`);
});