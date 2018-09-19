import {
  SIGNUP_USER,
  LOGOUT_USER,
  LOGIN_USER,
  GET_ALL_USERS,
  ERROR,
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
