import React, { Component } from 'react';
import { connect } from 'react-redux'
import { openModal } from '../actions/modalActions'
import { withRouter } from 'react-router-dom'
import { logoutUser, getAllUsers } from '../actions/userActions'
import '../styles/Navbar.css'
import io from 'socket.io-client'

const socketUrl = "http://192.168.1.2:5000"

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      socket: null
    }
  }

  componentWillMount(){
    this.initSocket()
  }

  initSocket(){
    const socket = io(socketUrl)

    socket.on('connect', () => {
      console.log(`connected to socket: ${socket.id}`);
    })
    this.setState({socket})
  }

  logoutPromise(){
    return new Promise((resolve, reject) => {
      return resolve(this.props.logoutUser())
    })
  }

  logout(){
    this.logoutPromise().then(res => {
      this.state.socket.emit("I_LOGGED_OUT", localStorage.username)
      this.props.getAllUsers().then(() => this.props.history.push('/'))
    })
  }

  showAuthLinks(){
    if(this.props.currentUser) {
      return(
        <div className="logout"><div onClick={this.logout.bind(this)}className="navbar-text">Logout</div></div>
      )
    } else {
      return (
        [
          <div key="1" className="signup"><div className="navbar-text"><a onClick={() => this.props.openModal('signup')}>Signup</a></div></div>,
          <div key="2" className="login"><div className="navbar-text"><a onClick={() => this.props.openModal('login')}>Login</a></div></div>
        ]
      )
    }
  }

  render(){
    return(
      <div className="navbar-container">
        <div className="navbar-left-container">
          <div className="logo">PlayChat</div>
        </div>
        <div className="navbar-right-container">
          {this.showAuthLinks()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})


export default withRouter(connect(mapStateToProps, { openModal, logoutUser, getAllUsers })(Navbar))
