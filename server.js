const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const db = require('./.git/keys.js').mongoURI
const users = require("./routes/api/users")
const cors = require('cors')
const express = require("express")
const app = express()
const server = require('http').createServer(app)
const io = module.exports.io = require('socket.io')(server)
const socketManager = require('./socketManager')

io.on('connection', socketManager)

mongoose.connect(db).then(() => console.log(`MongoDB is connected`))

app.use(cors())

app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', users)
app.get("/test", (req, res) => res.send("Working"))

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
