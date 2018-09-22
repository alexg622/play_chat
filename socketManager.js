const io = require("./server.js").io

module.exports = (socket) => {
  console.log(`Socket Id: ${socket.id}`);


}
