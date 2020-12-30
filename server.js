var express = require('express');
var app = express();
var path = require('path');
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


var users = [];
io.on('connect', function(socket) {
    console.log('nouvel utilisateur : ' + socket.id);
    var newUser = {
        pseudo: null,
        id: socket.id,
        x: 0,
        y: 0,
        speed: 500,
    }

	users.push(newUser);

    io.emit('initUser', newUser)
    
    io.emit('sendAllUser', users);

	socket.on('disconnect', function() {
        const user = users.find((element) => element.id == socket.id)
        users.splice(users.indexOf(user), 1);
        io.emit('sendAllUser', users);
        console.log('Deconnection de '+ user.pseudo + " = " + socket.id);
    });
    
    socket.on('UpdatePositions', function(hero) {
        var user;
        for(var i=0; i<users.length; ++i){
            if(users[i].id == hero.id){
                user = users[i];
                users[i] = hero
            }
        }
        io.emit('sendAllUser', users);
    })

    socket.on('UpdatePseudo', function(hero){
        var user;
        for(var i=0; i<users.length; ++i){
            if(users[i].id == hero.id){
                user = users[i];
                users[i] = hero
            }
        }
        io.emit('sendAllUser', users);
    })

});