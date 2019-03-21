const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const socketioapp = require("./socketIO/socketioapp");
const apiapp = require("./API/apiapp");

const corsOptions = {
  origin: "https://meetus.netlify.com",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: "Content-Type",
  optionsSuccessStatus: 200
}

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors(corsOptions))
const server = http.createServer(app);
const io = require('socket.io').listen(server);

apiapp.api(app);
socketioapp.socketIO(io);

server.listen(9090, () => {
    console.log('Server running on port 9090');
});
