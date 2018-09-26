import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/form.css'
import { closeModal } from '../actions/modalActions'
import { loginUser, clearErrors, getAllUsers } from '../actions/userActions'
import io from 'socket.io-client'
const socketUrl = "http://192.168.1.2:5000"
// const socketUrl = "http://192.168.0.192:5000"

// const socketUrl = "http://10.1.10.62:5000"

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      socket: null
    }
  }

  componentWillMount(){
    this.initSocket()
  }

  initSocket(){
    const socket = io(socketUrl)

    socket.on('connect', () => {
    })
    this.setState({socket})
  }

  componentDidMount(){
    this.props.clearErrors()
  }

  update(value) {
    return e => this.setState({[value]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    const user = { username: this.state.username, password: this.state.password }
    this.props.loginUser(user).then(res => {
      if(this.props.error){
        setTimeout(() => {
          this.props.clearErrors()
        }, 3000)
        return
      } else {
        this.props.getAllUsers()
        this.state.socket.emit("I_LOGGED_IN", this.state.username)
        this.props.closeModal()
      }
    })
  }

  render(){
    return(
      <div className="form-container">
        <form className="form"onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-title">
            <div>Login</div>
            {this.props.error ? <div className="errors">{this.props.error.err}</div> : null}
          </div>
          <div className="inputs">
            <input className="input-username" onChange={this.update("username")} type="text" value={this.state.username} placeholder="username"/>
            <input className="input-password" onChange={this.update("password")} type="password" placeholder="Password" value={this.state.password} />
            <input className="input-submit" type="submit" placeholder="Login"/>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{error: state.users.error}
}

export default connect(mapStateToProps, { closeModal, loginUser, clearErrors, getAllUsers })(Login)
