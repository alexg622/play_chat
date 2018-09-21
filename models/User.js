const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  loggedIn: {
    type: String,
    default: "True"
  },
  conversations: [
    {
      conversation: {
        type: Schema.Types.ObjectId,
        refs: "Conversation"
      },
      userConverser: {
        type: Schema.Types.ObjectId,
        refs: "User"
      },
    },
  ],
})

module.exports = User = mongoose.model("User", UserSchema)
