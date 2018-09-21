import React, { Component } from 'react';
import { getAllUsers } from '../actions/userActions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/home.css'

class Home extends Component {

  componentDidMount(){
    this.props.getAllUsers()
  }

  showAllUsers(){
    let output;
    let keys = Object.keys(this.props.users)
    if(keys.length > 1) {
      output = keys.map((user, idx) => {
        let loggedIn = this.props.users[user].loggedIn
        let background = "white"
        if (idx % 2 === 0) background = "lightgray"
        if (loggedIn === "True") {
          return (
            <div key={idx} className={`${background} user-loggedIn-container`}>
              <div className="give-border">
                <div className="user">{user}</div>
                <div className="loggedIn"></div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={idx} className={`${background} user-notLoggedIn-container`}>
              <div className="give-border">
                <div className="user">{user}</div>
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
          <div className="chat-container"></div>
          <div className="enter-text-container"></div>
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
