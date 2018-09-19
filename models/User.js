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
    default: "False"
  }
})

module.exports = User = mongoose.model("User", UserSchema)
