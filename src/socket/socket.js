const { Server } = require('socket.io');
const Chat = require('../schemas/chat');

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('leave', (room) => {
            console.log(`User leave room ${room}`);
            socket.leave(room);
        });

        // Join the user to a room
        socket.on('join', (room) => {
            socket.join(room);
            console.log(`User joined room ${room}`);
        });

        // Leave the room when the user disconnects
        socket.on('disconnect', () => {
            console.log('user disconnected');
            socket.leaveAll();
        });

        // Handle incoming messages
        socket.on('message', async (msg) => {
            try {
                const chat = await Chat.findById(msg.room);
                if (chat) {
                    chat.messages.push({
                        sender: msg.sender,
                        text: msg.text,
                    });
                    await chat.save();
                }
            } catch (err) {
                console.error('Error saving chat message:', err);
            }

            console.log(msg);

            // Send the message to all users in the room
            io.to(msg.room).emit('message', msg);
        });
    });
}

module.exports = initializeSocket;
