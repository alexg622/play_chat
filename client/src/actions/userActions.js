import {
  SIGNUP_USER,
  LOGOUT_USER,
  LOGIN_USER,
  GET_ALL_USERS,
  CLEAR_ERRORS,
  ERROR,
  SET_CURRENT_USER,
  GET_USER} from '../types/types'
import axios from 'axios'

export const getAllUsers = () => dispatch => (
  axios.get(`http://localhost:5000/api/users`)
    .then(res => {
      dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    })
  })
    .catch(err => dispatch({
      type: ERROR,
      payload: {msg: "No users to get"}
    }))
)

export const signupUser = data => dispatch => (
  axios.post(
    `http://localhost:5000/api/users/signup`,
    data
  )
  .then(res => {
    localStorage.signedIn = "True"
    localStorage.userId = String(res.data._id)
    localStorage.username = res.data.username
    return dispatch({
      type: SET_CURRENT_USER,
      payload: {username: res.data.username, id: String(res.data._id)}
    })
  })
  .catch(err => dispatch({
    type: ERROR,
    payload: {err: "Please enter a valid username and password"}
  }))
)

export const loginUser = data => dispatch => (
  axios.post(
    `http://localhost:5000/api/users/login`,
    data
  )
  .then(res => {
    localStorage.signedIn = "True"
    localStorage.userId = String(res.data._id)
    localStorage.username = res.data.username
    return dispatch({
      type: SET_CURRENT_USER,
      payload: {username: res.data.username, id: String(res.data._id)}
    })
  })
  .catch(err => dispatch({
    type: ERROR,
    payload: {err: "Please enter a valid username and password"}
  }))
)

export const setCurrentUser = user => dispatch => (
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  })
)

export const logoutUser = () => dispatch => {
  axios.delete(`http://localhost:5000/api/users/logout/${localStorage.userId}`,
    {params: {userId: localStorage.userId}}
  ).then(res => {
    localStorage.signedIn = "False"
    localStorage.username = ""
    localStorage.userId = ""
    axios.get(`http://localhost:5000/api/users`)
      .then(res => {
        dispatch({
          type: LOGOUT_USER,
          payload: res.data
        })
      })
  })
  .catch(err => {
    dispatch({
      type: ERROR,
      payload: {msg: "Could not find user"}
    })
  })
}

export const clearErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_ERRORS
  })
}
