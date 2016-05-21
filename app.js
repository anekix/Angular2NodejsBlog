var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var routes = require('./routes/routes.js')(app);

mongoose.connect('mongodb://localhost/mongo');
mongoose.model('users',{name:String});



var server = app.listen(3000,function() {
	console.log("listening on port %s..",server.address().port);
});