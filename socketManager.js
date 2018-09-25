const io = require("./server.js").io

module.exports = (socket) => {

  socket.on("SEND_MESSAGE", (converser, username) => {
    console.log(converser);
    console.log("in");
    console.log(`RECEIVE_MESSAGE_${converser}`);
    io.emit(`RECEIVE_MESSAGE_${converser}`, username)
  })

  socket.on("I_LOGGED_IN", (username) => {
    io.emit("USER_LOGGED_IN", username)
  })
  
  socket.on("I_SIGNED_IN", (username) => {
    io.emit("USER_SIGNED_IN", username)
  })

  socket.on("I_LOGGED_OUT", (username) => {
    io.emit("USER_LOGGED_OUT", username)
  })

  console.log(`Connected to socket: ${socket.id}`);
}
