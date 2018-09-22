const io = require("./server.js").io

module.exports = (socket) => {
  console.log(`Socket Id: ${socket.id}`);

  socket.on("SEND_MESSAGE", (converser, username) => {
    io.emit(`RECEIVE_MESSAGE_${converser}`, username)
  })

  socket.on("I_LOGGED_IN", (username) => {
    console.log("In logged in");
    io.emit("USER_LOGGED_IN", username)
  })

  socket.on("I_LOGGED_OUT", (username) => {
    io.emit("USER_LOGGED_OUT", username)
  })

}
