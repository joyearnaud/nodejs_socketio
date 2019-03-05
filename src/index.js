// TODO
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io').listen(server);

// const path = require('path');
// app.use(express.static(path.join(__dirname, '../public')));

server.listen(8080, () => {
	console.log('Server running on port 8080');
});

const clients = {};
let count = 0;

io.on('connection', function connection(socket) {
	let id = count++;
	console.log('----');
	clients[id] = { socketId: socket.id, user: {} };
	console.log('socket.id', clients);

	socket.emit('getUser', id);
	socket.on('setUser', user => {
		clients[id].user = user;
		console.log('User setted', clients[id]);
	});

	socket.on('message', message => {
		if (message.author.id === clients[id].user.id) {
			socket.emit('message', message);
			socket.broadcast.emit('message', message);
		} else {
			socket.emit('error', 'Your are not allowed to send message');
		}
	});

	socket.on('disconnect', () => {
		console.log('Disconnected');
		delete clients[id];
	});
});
