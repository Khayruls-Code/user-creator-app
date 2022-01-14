import { useEffect, useState } from "react"
import initializeAuthentication from "../firebase/firebase.init"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
initializeAuthentication()

const auth = getAuth()

const useFirebase = () => {
  const [user, setUser] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setisLoading] = useState(true)

  //login user
  const signInUser = (email, password, location, navigate) => {
    setisLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        setUser(result.user)
        setError('')
        setSuccess(true)
        navigate(location.state.from)
      })
      .catch(error => {
        setError(error.message)
        setSuccess(false)
      })
      .finally(setisLoading(false))
  }

  //get current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        getIdToken(user)
          .then(idToken => sessionStorage.setItem("idToken", idToken))
          .catch(error => console.log(error))
      } else {
        setUser({})
      }
      setisLoading(false)
    })
    return () => unSubscribe;
  }, [])

  //sing out user
  const singOutUser = () => {
    setisLoading(true)
    signOut(auth)
      .then(() => {
        setUser({})
        setError('')
      })
      .catch(error => {
        setError(error.message)
      })
      .finally(setisLoading(false))
  }

  return {
    user,
    error,
    success,
    signInUser,
    singOutUser,
    isLoading
  }
}

export default useFirebase;