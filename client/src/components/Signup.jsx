import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signupUser, getAllUsers } from '../actions/userActions'
import { closeModal } from '../actions/modalActions'
import '../styles/form.css'

class Signup extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  update(value) {
    return e => this.setState({[value]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    const newUser = { username: this.state.username, password: this.state.password }
    this.props.signupUser(newUser).then(res => {
      this.props.getAllUsers()
      this.props.closeModal()
    })
  }

  render(){
    return(
      <div className="form-container">
        <form className="form"onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-title">Signup</div>
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

export default connect(null, { closeModal, signupUser, getAllUsers })(Signup)
