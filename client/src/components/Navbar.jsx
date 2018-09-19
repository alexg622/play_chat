import React, { Component } from 'react';
import '../styles/Navbar.css'

class Navbar extends Component {

  render(){
    return(
      <div className="navbar-container">
        <div className="navbar-left-container">
          <div className="logo">PlayChat</div>
        </div>
        <div className="navbar-right-container">
          <div className="signup"><div className="navbar-text">Signup</div></div>
          <div className="login"><div className="navbar-text">Login</div></div>
          <div className="logout"><div className="navbar-text">Logout</div></div>
        </div>
      </div>
    )
  }
}

export default Navbar
