import {
  // SIGNUP_USER,
  LOGOUT_USER,
  LOGIN_USER,
  GET_ALL_USERS,
  CLEAR_ERRORS,
  ERROR,
  SET_CURRENT_USER,
  MAKE_CONVERSATION,
  GET_CONVO_MESSAGES,
  } from '../types/types'
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
    localStorage.conversations = JSON.stringify(res.data.conversations)
    localStorage.read = res.data.read
    return dispatch({
      type: LOGIN_USER,
      payload: {username: res.data.username, id: String(res.data._id), conversations: res.data.conversations}
    })
  })
  .catch(err => dispatch({
    type: ERROR,
    payload: {err: "Please enter a valid username and password that isn't taken"}
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
    localStorage.conversations = JSON.stringify(res.data.conversations)
    localStorage.read = res.data.read
    return dispatch({
      type: LOGIN_USER,
      payload: {username: res.data.username, read: res.data.read, conversations: res.data.conversations, id: String(res.data._id)}
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
    localStorage.conversations = ""
    localStorage.read = ""
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

export const makeConversation = (userId, username) => dispatch => (
  axios.get(`http://localhost:5000/api/users/${userId}/conversations/${username}`)
    .then(res => {
      return dispatch({
        type: MAKE_CONVERSATION,
        payload: res.data
      })
    })
)

export const makeMessage = (text, userId, conversationId) => dispatch => (
  axios.post(`http://localhost:5000/api/users/${userId}/conversations/${conversationId}/messages`, { text })
)

export const getConvoMessages = (conversationId, username) => dispatch => (
  axios.get(`http://localhost:5000/api/users/${username}/conversations/${conversationId}/messages`)
    .then(convoMessages => {
      return dispatch({
      type: GET_CONVO_MESSAGES,
      payload: convoMessages.data.messages
    })
  })
)

export const getCurrentUser = () => dispatch => (
  axios.get(`http://localhost:5000/api/users/${localStorage.userId}`)
    .then(res => {
      localStorage.signedIn = "True"
      localStorage.userId = localStorage.userId
      localStorage.username = res.data.username
      localStorage.conversations = JSON.stringify(res.data.conversations)
      localStorage.read = res.data.read
      dispatch({
      type: SET_CURRENT_USER,
      payload: {username: localStorage.username, convsersations: res.data.conversations, id: localStorage.userId, read: localStorage.read}
    })
  })
)
