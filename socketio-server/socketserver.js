const port = 5010;
const io = require('socket.io').listen(port);

io.sockets.on('connection', (socket) => {
  console.log('user connected');
  socket.emit('welcome', 'User connected to Chess server');

  socket.on('message', (msg) => {
    console.log(msg.data.room)
    socket.broadcast.emit(msg.data.room, { data: msg.data });
  });
});
console.log(`Socket.io server started on port ${port}`);
