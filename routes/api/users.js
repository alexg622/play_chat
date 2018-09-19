const express = require('express')
const router = express.Router()
const User = require("../../models/User")

router.get("/users/test", (req, res) => res.json({msg: "Working"}))


router.get('/users', (req, res) => {
  let userObject = {}
  User.find()
    .then(users => {
      users.map(user => {
        userObject[user.username] = {loggedIn: user.loggedIn, id: user.id}
      })
      res.json(userObject)
    })
    .catch(err => res.json(err))
})

router.get('/users/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json({username: user.username, id: user.id, loggedIn: user.loggedIn})
    })
    .catch(err => res.json(err))
})

router.post('/users/signup', (req, res) => {

  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  })

  newUser.save().then(user => res.json(user)).catch(err => res.json(err))
})

router.post('/users/login', (req, res) => {
  User.findOne({username: req.body.username})
    .then(user => {
      if(user.password === req.body.password) {
        user.loggedIn = "True"
        user.save()
        return res.json(user)
      } else {
        return res.json({err: "Wrong username or password"})
      }
    })
    .catch(err => res.json(err))
})

router.delete('/users/logout', (req, res) => {
  User.findById(req.body.userId)
    .then(user => {
      user.loggedIn = "False"
      user.save().then(user => res.json(user))
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router
