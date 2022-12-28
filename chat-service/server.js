const express = require('express');
const connectDb = require('./config/db');
const messageRoutes = require('./routes/message-routes');
const chatRoutes = require('./routes/chat-routes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/messages', messageRoutes);
app.use('/chats', chatRoutes);

connectDb();

const server = app.listen(
  process.env.PORT,
  console.log(`chat-service listening on port ${process.env.PORT}`)
)

const io = require('socket.io')(server, {
  cors: {
    origin: `${process.env.FRONTEND_URI}`,
    credentials: true,
  },
  pingTimeout: 60000,
});

io.on('connection', (socket) => {
  console.log('connected to socket.io');

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('user joined room' + room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));

  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessage) => {
    let chat = newMessage.chat;

    if (!chat.users) {
      return console.log('chat users not defined');
    }

    chat.users.forEach((user) => {
      if (user.username == newMessage.sender.username) {
        return;
      }
      socket.in(username).emit('message received', newMessage);
    });
  });

  socket.off('setup', () => {
    console.log('user disconnected');
    socket.leave(userData._id);
  })
});
