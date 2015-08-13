var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session')

var app = express();
    app.use(cookieParser());
    app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieSession({secret: 'app_1'}));

app.get('public/gomerias.json', function(req, res) {
	//console.log(req.body);
    res.send(req.body);
});

app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log('Listening on port 3000...');