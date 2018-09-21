import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/form.css'
import { closeModal } from '../actions/modalActions'
import { loginUser, clearErrors, getAllUsers } from '../actions/userActions'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: ""
    }
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
        return
      } else {
        this.props.getAllUsers()
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
