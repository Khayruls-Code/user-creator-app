import axios from "axios"

export const LOAD_USER = "LOAD_USER"
export const ADD_USER = "ADD_USER"
export const DELETE_USER = "DELETE_USER"
export const ERROR_DEAL = "ERROR_DEAL"

const loadUser = (payload) => {
  return {
    type: LOAD_USER,
    payload
  }
}
const addUser = (payload) => {
  return {
    type: ADD_USER,
    payload
  }
}

const deleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload
  }
}
export const errorMessage = (payload) => {
  return {
    type: ERROR_DEAL,
    payload
  }
}
export const getUser = () => {
  return (dispatch) => {
    axios.get('http://localhost:5000/users', {
      headers: {
        authorization: 'Bearer ' + sessionStorage.getItem('idToken')
      }
    })
      .then(res => {
        if (res.status === 200) {
          dispatch(loadUser(res.data))
        }
      })
      .catch(err => {
        dispatch(errorMessage(err.message))
      })
  }
}

export const getDeleteUser = (id) => {
  return (dispatch) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(res => {
        dispatch(deleteUser(res.data))
        dispatch(getUser())
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

export const getAddedUser = (user) => {
  return (dispatch) => {
    axios.post('http://localhost:5000/users', user)
      .then(res => {
        dispatch(addUser(res.data))
        dispatch(getUser())
      })
      .catch(err => {
        console.log(err)
      })
  }
}