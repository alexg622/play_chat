const express = require('express')
const router = express.Router()
const Conversation = require("../../models/Conversation")
const Message = require("../../models/Message")
const User = require("../../models/User")

router.get("/users/test", (req, res) => res.json({msg: "Working"}))


router.get('/users', (req, res) => {
  let userObject = {}
  User.find()
    .then(users => {
      users.map(user => {
        userObject[user.username] = {read: user.read, loggedIn: user.loggedIn, id: user.id, conversations: user.conversations}
      })
      res.json(userObject)
    })
    .catch(err => res.json(err))
})

router.get('/users/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json({username: user.username, read: user.read, id: user.id, loggedIn: user.loggedIn, conversations: user.conversations})
    })
    .catch(err => res.json(err))
})

router.post('/users/signup', (req, res) => {
  console.log("hwew");
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  })
  newUser.save().then(user => res.json(user)).catch(() => res.status(404).json({err: "Please enter a valid user name and password with a length of at least one."}))
})

router.post('/users/login', (req, res) => {
  User.findOne({username: req.body.username})
    .then(user => {
      if(user.password === req.body.password) {
        user.loggedIn = "True"
        user.save()
        return res.json(user)
      } else {
        return res.status(404).json({err: "Wrong username or password"})
      }
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

router.delete('/users/logout/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      user.loggedIn = "False"
      user.save().then(user => res.json(user))
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/users/:userId/conversations/:converserName', (req, res) => {
  console.log("here");
  let counter = false
  let theConvo
  let breakLoop = false
  User.findOne({username: req.params.converserName})
    .then(userTwo => {
      User.findById(req.params.userId)
        .then(userOne => {
          if(breakLoop) return
          userOne.conversations.map(convo => {
            if (String(convo.userConverser) === String(userTwo.id)) {
              counter = true
              theConvo = convo
             }
          })
          if(counter) {
            userOne.read = "True"
            return res.json(theConvo)
          } else {
            const newConversation = new Conversation({
              userTwo: userTwo,
              userOne: userOne
            })
            newConversation.save()
            .then(conversation => {
              userOne.conversations.unshift({conversation: conversation, userConverser: userTwo})
              userOne.save().then(userSaved => res.json(userSaved.conversations[0]))
              userTwo.conversations.unshift({conversation: conversation, userConverser: userOne})
              userTwo.save().then((user) => user).catch(err => err)
              return
            })
          }
        })
    })
})

router.post("/users/:userId/conversations/:conversationId/messages", (req, res) => {
  console.log("in message");
  console.log(req.params.conversationId);
  Conversation.findById(req.params.conversationId)
    .then(conversation => {
      console.log(conversation);
      User.findById(req.params.userId)
        .then(user => {
          const newMessage = new Message({
            text: req.body.text,
            user: user
          })
          newMessage.save()
            .then(message => {
              conversation.messages.push(message)
              conversation.numberOfMessages = String(conversation.messages.length)
              conversation.save().then(response => res.json(response))
            })
        })
    })
})



router.get('/users/:username/conversations/:conversationId/messages', (req, res) => {
  Conversation.findById(req.params.conversationId)
    .then(conversation => {
      let promises = conversation.messages.map(message => {
        return Message.findById(message._id)
        .then(msg => msg)
      })
      Promise.all(promises).then(result => res.json({messages: result}))
    })
})


module.exports = router
