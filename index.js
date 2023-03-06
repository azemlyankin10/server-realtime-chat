const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const authenticate = require('./src/utils/authenticate');
const initializeSocket = require('./src/socket/socket');

const app = express();
// Allow cross-origin requests from http://localhost:4200
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Enable CORS for all routes
app.use(
    cors({
        origin: 'https://angular-nodejs-realtime-frontend.vercel.app',
    })
);

app.use(express.json());
app.use(express.static('public'));
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('<html><body><h1>Hello World!</h1></body></html>');
});

mongoose
    .connect(
        'mongodb+srv://forazemlyankin:EdyqkyiIgtbDOCEx@cluster0.pprqtk6.mongodb.net/chat',
        { useNewUrlParser: true }
    )
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error('Error connecting to database', error));

app.use('/', require('./src/routes/auth'));
app.use('/chat', authenticate, require('./src/routes/chat'));
app.use('/user', authenticate, require('./src/routes/user'));
app.use('/profile', authenticate, require('./src/routes/profile'));

initializeSocket(server);

server.listen(3000, () => {
    console.log('listening on *:3000');
});
