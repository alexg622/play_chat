const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  text: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    refs: "User"
  }
})

module.exports = Message = mongoose.model("Message", MessageSchema)
