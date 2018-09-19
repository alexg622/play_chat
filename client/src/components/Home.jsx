import React, { Component } from 'react';
import { getAllUsers } from '../actions/userActions'
import { connect } from 'react-redux'

class Home extends Component {

  componendDidMount(){
    this.props.getAllUsers()
  }

  render(){
    window.state = this.props
    return(
      <div>
        Home Works
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  user: state.users.user,
  error: state.users.error
})



export default connect(mapStateToProps, { getAllUsers })(Home)
