const port = 5010;
const io = require('socket.io').listen(port);

io.sockets.on('connection', (socket) => {
  socket.emit('welcome', 'User connected to Chess server');

  socket.on('message', (msg) => {
    socket.broadcast.emit(msg.data.room, { data: msg.data });
  });

  socket.on('disconnect', () => {
  });
});
console.log(`Socket.io server started on port ${port}`);
