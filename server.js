const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const db = require('./.git/keys.js').mongoURI
const users = require("./routes/api/users")

mongoose.connect(db).then(() => console.log(`MongoDB is connected`))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', users)
app.get("/test", (req, res) => res.send("Working"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
