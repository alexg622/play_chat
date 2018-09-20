import {
  GET_ALL_USERS,
  SET_CURRENT_USER,
  LOGOUT_USER,
  ERROR
} from '../types/types'

const initialState = {
  user: {},
  users: [],
  currentUser: null,
  error: {}
}

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null
      }
    default:
      return state
  }
}

export default usersReducer
