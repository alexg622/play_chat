import React, { Component } from 'react';
import { getAllUsers, getConvoMessages, makeMessage, makeConversation } from '../actions/userActions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import '../styles/home.css'

const socketUrl = "http://192.168.1.2:5000"

class Home extends Component {
  constructor(){
    super()
    this.state = {
      text: "",
      converser: "",
      socket: null
    }
    this.makeConversation = this.makeConversation.bind(this)
    this.handleUser = this.handleUser.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
  }
  componentDidMount(){
    this.props.getAllUsers()
  }

  componentWillMount(){
    this.initSocket()
  }

  initSocket(){
    const socket = io(socketUrl)
    console.log(`RECEIVE_MESSAGE_${localStorage.username}`);
    socket.on(`RECEIVE_MESSAGE_${localStorage.username}`, (username) => {
      console.log("in receive message");
      console.log(localStorage.userId);
      console.log(username);
      this.makeConversation(localStorage.userId, username)
    })
    socket.on('connect', () => {
      console.log(`connected to socket: ${socket.id}`);
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
    this.props.makeConversation(userId, username)
      .then(res => this.props.getConvoMessages(this.props.currentConvo.conversation))
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
    this.props.makeMessage(this.state.text, localStorage.userId, this.props.currentConvo.conversation)
      .then(res => {
        this.props.getConvoMessages(res.data._id)
        this.state.socket.emit(`SEND_MESSAGE`, this.state.converser, localStorage.username)
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



export default withRouter(connect(mapStateToProps, { getAllUsers, makeMessage, getConvoMessages, makeConversation })(Home))
