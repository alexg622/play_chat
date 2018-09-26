
import React, { Component } from 'react';
import { getAllUsers, getCurrentUser, getConvoMessages, makeMessage, makeConversation } from '../actions/userActions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/home.css'
import io from 'socket.io-client'

const socketUrl = "http://192.168.1.2:5000"
// const socketUrl = "http://192.168.0.192:5000"

// const socketUrl = "http://10.1.10.62:5000"

class Home extends Component {
  constructor(){
    super()
    this.state = {
      text: "",
      converser: null,
      socket: null
    }
    this.makeConversation = this.makeConversation.bind(this)
    this.handleUser = this.handleUser.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
  }
  componentDidMount(){
    this.props.getAllUsers()
    this.initSocket()
  }

  componentWillMount(){
    this.initSocket()
  }

  initSocket(){
    const socket = io(socketUrl)

    socket.on(`RECEIVE_MESSAGE_${localStorage.username}`, (username) => {
      console.log("in receive");
      console.log(`RECEIVE_MESSAGE_${localStorage.username}`);
      this.makeConversation(localStorage.userId, username)
    })

    socket.on("USER_LOGGED_IN", (username) => {
      this.props.getAllUsers().then(res => {
        return
      })
    })

    socket.on("USER_SIGNED_IN", (username) => {
      this.props.getAllUsers().then(res => {
        return
      })
    })


    socket.on("USER_LOGGED_OUT", (username) => {
      this.props.getAllUsers().then(res => {
        return
      })
    })

    socket.on('connect', () => {
    })
    this.setState({socket})
  }

  update(field){
    return e => this.setState({[field]: e.target.value})
  }

  handleUser(e){
    this.setState({text: ""})
    if(localStorage.signedIn === "True"){
      window.target = e.target
      document.querySelector('.message-input').placeholder = `Message @${e.target.innerText}`
      this.setState({converser: e.target.innerText})
      console.log(e.target.innerText);
      this.makeConversation(localStorage.userId, e.target.innerText)
    } else {
      let div = document.querySelector('.signin-make-chat')
      div.classList.remove("signin-to-chat")
      setTimeout(() => {
        div.classList.add("signin-to-chat")
      }, 5000)
    }
  }

  makeConversation(userId, username){
    console.log(userId, username);
    this.props.makeConversation(userId, username)
      .then(res => {
        if(this.state.currentConvo === null || this.state.converser === null || username !== this.state.converser){
          console.log("here");
          return this.props.makeConversation(userId, username)
        }
        // this.props.getCurrentUser()
        this.props.getConvoMessages(this.props.currentConvo.conversation, this.state.converser).then(reso => {
          document.querySelector('.chat-container').scrollTop = document.querySelector('.chat-container').scrollHeight
        })
      })
  }

  showAllUsers(){
    let output;
    let keys = Object.keys(this.props.users).sort()
    if(keys.length > 1) {
      output = keys.map((user, idx) => {
        let loggedIn = this.props.users[user].loggedIn
        let background = "white"
        if (idx % 2 === 0) background = "lightgray"
        if (loggedIn === "True") {
          return (
            <div key={idx} className={`${background} user-loggedIn-container`}>
              <div className="give-border">
                <div onClick={this.handleUser} className="user">{user}</div>
                <div className="loggedIn"></div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={idx} className={`${background} user-notLoggedIn-container`}>
              <div className="give-border">
                <div onClick={this.handleUser} className="user">{user}</div>
                <div className="notLoggedIn"></div>
              </div>
            </div>
          )
        }
      })
    }
    return output
  }

  submitMessage(e){
    e.preventDefault()

    if(!this.props.currentConvo) return this.setState({text: ""})
    this.props.makeMessage(this.state.text, localStorage.userId, this.props.currentConvo.conversation)
      .then(res => {
        this.props.getConvoMessages(res.data._id, this.state.converser).then(reso => {
          document.querySelector('.chat-container').scrollTop = document.querySelector('.chat-container').scrollHeight
        })
        this.state.socket.emit(`SEND_MESSAGE`, this.state.converser, localStorage.username)
        console.log("insend");
        console.log(this.state.converser);
        this.setState({text: ""})
      })
  }

  showConvoMessages(){
    let result
    if(this.props.convoMessages && this.props.convoMessages.length > 0) {
      result = this.props.convoMessages.map((message, idx) => {
        return (
          <div key={`${idx}`} className="home-actual-text">{message.text}</div>
        )
      })
    }
    return result
  }




  render(){
    window.theState = this.state
    this.showConvoMessages()
    return(
      <div className="home-container">
        <div  className="home-left-container">{this.showAllUsers()}</div>
        <div className="home-right-container">
          <div className="chat-container">
            {this.showConvoMessages()}
            <div className="getit signin-make-chat signin-to-chat">Signin to chat</div>
          </div>
          <form onSubmit={this.submitMessage} className="message-form">
            <input className="message-input"type="text" value={this.state.text} placeholder="@Message" onChange={this.update("text")}/>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  user: state.users.user,
  error: state.users.error,
  currentConvo: state.users.currentConvo,
  convoMessages: state.users.convoMessages
})



export default withRouter(connect(mapStateToProps, { getAllUsers, makeMessage, getConvoMessages, getCurrentUser, makeConversation })(Home))
