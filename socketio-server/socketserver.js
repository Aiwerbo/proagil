const port = 5010;
const io = require('socket.io').listen(port);

io.sockets.on('connection', (socket) => {
  console.log('user connected');
  socket.emit('welcome', 'User connected to Chess server');

  socket.on('message', (msg) => {
    socket.emit('welcome', { data: `Hey from server. You sent me: ${msg.data}` });
  });
});
console.log(`Socket.io server started on port ${port}`);
