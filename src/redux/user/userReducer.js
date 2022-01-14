import { ADD_USER, DELETE_USER, ERROR_DEAL, LOAD_USER } from "./userAction"

const initialState = {
  users: [],
  loading: true,
  error: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER: return {
      ...state,
      users: action.payload,
      status: action.payload,
      loading: false
    }
    case ADD_USER:
    case DELETE_USER: return {
      ...state,
      loading: false
    }
    case ERROR_DEAL: return {
      ...state,
      error: action.payload
    }
    default: return {
      ...state
    }
  }
}

export default userReducer;