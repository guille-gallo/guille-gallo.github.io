var express = require('express'),
    app = express();
    app.use(express.bodyParser());

app.get('/gomerias.json', function(req, res) {
    res.send();
});

app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log('Listening on port 3000...');