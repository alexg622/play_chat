import {
  SIGNUP_USER,
  LOGOUT_USER,
  LOGIN_USER,
  GET_ALL_USERS,
  ERROR,
  SET_CURRENT_USER,
  GET_USER} from '../types/types'
import axios from 'axios'

export const getAllUsers = () => dispatch => (
  axios.get(`http://localhost:5000/api/users`)
    .then(res => dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    }))
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
    paload: {err: "Please enter a valid username and password"}
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
  .catch(err => {
    dispatch({
    type: ERROR,
    paload: {err: "Please enter a valid username and password"}
  })})
)

export const setCurrentUser = user => dispatch => (
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  })
)

export const logoutUser = () => dispatch => {
  localStorage.signedIn = "False"
  localStorage.username = ""
  localStorage.userId = ""
  dispatch({
    type: LOGOUT_USER
  })
}
