const io = require("./server.js").io

module.exports = (socket) => {
  console.log(`Socket Id: ${socket.id}`);
  socket.on("SEND_MESSAGE", (converser, username) => {
    console.log(`RECEIVE_MESSAGE_${converser}`);
    io.emit(`RECEIVE_MESSAGE_${converser}`, username)
  })

}
