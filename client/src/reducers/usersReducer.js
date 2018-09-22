import {
  GET_ALL_USERS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  LOGOUT_USER,
  MAKE_CONVERSATION,
  GET_CONVO_MESSAGES,
  ERROR
} from '../types/types'

const initialState = {
  user: {},
  users: [],
  currentConvo: null,
  currentUser: null,
  error: null,
  convoMessages: null
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
        currentUser: null,
        users: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    case MAKE_CONVERSATION:
      return {
        ...state,
        currentConvo: action.payload
      }
    case GET_CONVO_MESSAGES:
      return {
        ...state,
        convoMessages: action.payload
      }
    default:
      return state
  }
}

export default usersReducer
