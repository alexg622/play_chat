const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = new Schema({
  messages: [
    {
      message: {
        type: Schema.Types.ObjectId,
        refs: "Message"
      },
    },
  ],
  userTwo: {
    type: Schema.Types.ObjectId,
    refs: "User"
  },
  userOne: {
    type: Schema.Types.ObjectId,
    refs: "User"
  },
  numberOfMessages: {
    type: String,
    default: "0"
  },
})



module.exports = Conversation = mongoose.model("Conversation", ConversationSchema)
