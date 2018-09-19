import {
  GET_ALL_USERS,
  ERROR
} from '../types/types'

const initialState = {
  user: {},
  users: [],
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
    default:
      return state
  }
}

export default usersReducer
