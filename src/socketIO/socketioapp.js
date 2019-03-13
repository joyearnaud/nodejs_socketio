const clients = {};
let count = 0;

var exports = module.exports = {};

let usersToReturn = (cl) => {
    return Object.entries(cl).map(c => {
        const firstClient = c[1];
        return (firstClient.socketId && firstClient.user && Object.entries(firstClient.user).length > 0) ? firstClient.user : null;
    }).filter(c => {
        return c ? Object.entries(c).length > 0 : null
    }).sort((a, b) => {
        return a.id - b.id;
    });
};


exports.socketIO = (io) => {
    io.on('connection', function connection(socket) {
        let id = count++;
        console.log('----NEW_SOCKET----', id);
        clients[id] = {socketId: socket.id, user: {}};
        console.log(clients[id]);

        socket.on('setUser', user => {
            clients[id].user = user;
            console.log('====NEW_USER====', id);
            console.log(`User ${id} setted`, clients[id]);

            const users = usersToReturn(clients);
            socket.emit('setConnectedUsers', users);
            socket.broadcast.emit('setConnectedUsers', users);
        });

        socket.on('message', message => {
            if (message.author.id === clients[id].user.id) {
                socket.emit('message', message);
                socket.broadcast.emit('message', message);
            } else {
                socket.emit('error', 'Your are not allowed to send message');
            }
        });

        socket.on('closedConnexion', () => {
            console.log('....DISCONNECTED....', id);
            delete clients[id].user;
            socket.broadcast.emit('setConnectedUsers', usersToReturn(clients));
        });

        socket.on('disconnect', () => {
            console.log('....DISCONNECTED....', id);
            delete clients[id];
            socket.broadcast.emit('setConnectedUsers', usersToReturn(clients));
        });
    });
};