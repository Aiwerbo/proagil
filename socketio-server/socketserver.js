const io = require("socket.io");
const port = 5010
const server = io.listen(port);


server.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("welcome", "User connected");

  socket.on('message', (msg) => {
    io.emit({data: `Hey from server ${msg}`})
  })

});



console.log(`Socket.io server started on port ${port}` )