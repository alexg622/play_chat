import React, { Component } from 'react';
import { getAllUsers } from '../actions/userActions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/home.css'

class Home extends Component {
  constructor(){
    super()
    this.state = {
      text: ""
    }
  }
  componentDidMount(){
    this.props.getAllUsers()
  }

  update(field){
    return e => this.setState({[field]: e.target.value})
  }

  handleUser(e){
    if(localStorage.signedIn === "True"){
      window.target = e.target
      document.querySelector('.message-input').placeholder = `Message @${e.target.innerText}`
    } else {
      let div = document.querySelector('.signin-make-chat')
      div.classList.remove("signin-to-chat")
      setTimeout(() => {
        div.classList.add("signin-to-chat")
      }, 5000)
    }
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

  render(){
    return(
      <div className="home-container">
        <div  className="home-left-container">{this.showAllUsers()}</div>
        <div className="home-right-container">
          <div className="chat-container">
            <div className="getit signin-make-chat signin-to-chat">Signin to chat</div>
          </div>
          <form className="message-form">
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
  error: state.users.error
})



export default withRouter(connect(mapStateToProps, { getAllUsers })(Home))
