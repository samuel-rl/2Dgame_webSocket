var express = require('express');
var app = express();
var path = require('path');
const { disconnect } = require('process');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, "/public")));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/../public/index.html', err => {
		console.log(err);
	});
});
http.listen(3000, function() {
	console.log('listening on *:3000');
});