// TODO
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io').listen(server);

// const path = require('path');
// app.use(express.static(path.join(__dirname, '../public')));

server.listen(9090, () => {
	console.log('Server running on port 9090');
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

	socket.on('getConnectedUsers', () => {
		let usersToReturn = Object.entries(clients).map(client => {

			const firstClient = client[1];
			return (firstClient.socketId && firstClient.user) ? firstClient.user : null;
		});
		socket.emit('setConnectedUsers', usersToReturn);
	});

	socket.on('disconnect', () => {
		console.log(clients[id].user.firstName + ' ' + clients[id].user.lastName + ' disconnected');
		delete clients[id];
	});
});
