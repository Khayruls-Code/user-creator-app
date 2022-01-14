import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAddedUser } from '../../../redux/user/userAction';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};
const AddUser = () => {

  const [data, setData] = useState({})
  const [error, setError] = useState('')

  const dispatch = useDispatch()

  const getUserData = (e) => {
    const value = e.target.value
    const property = e.target.name
    const newObj = { ...data }
    newObj[property] = value;
    setData(newObj)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (data.name.indexOf(' ') >= 0) {
      setError('White Space Not Allowed for Name')
      return;
    } else if (!data.name.replace(/[^0-9]/g, '').length) {
      setError('The User Name must be consist of character and number')
      return
    } else if (data.phone.length > 10 || data.phone.length < 10) {
      setError('Mobile Number must be 10 Digit')
      return;
    } else if (!validateEmail(data.email)) {
      setError('Invailed email')
      return;
    } else {
      console.log(data)
      dispatch(getAddedUser(data))
      setError('')
      e.target.reset()
      alert('User Created Successfully!!')
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <Box>
      <Typography sx={{ my: 2 }} variant='h4'>Add User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="User Name"
          placeholder="Type Name..."
          sx={{ width: "100%", maxWidth: "500px", my: 1 }}
          name='name'
          onBlur={getUserData}
        /><br />
        <TextField
          required
          label="Mobile"
          type='number'
          placeholder="Type Number..."
          sx={{ width: "100%", maxWidth: "500px", my: 1 }}
          name='phone'
          onBlur={getUserData}
        /><br />
        <TextField
          required
          label="Email"
          type='email'
          placeholder="Type Email..."
          sx={{ width: "100%", maxWidth: "500px", my: 1 }}
          name='email'
          onBlur={getUserData}
        /><br />
        <TextField
          required
          label="Address"
          placeholder="Type Address..."
          sx={{ width: "100%", maxWidth: "500px", my: 1 }}
          name='address'
          onBlur={getUserData}
        /><br />
        {
          error && <Alert sx={{ mt: 1, width: "50%", }} severity="error">{error}</Alert>
        }
        <Button type='submit' sx={{ my: 1 }} style={styles.root} >Submit</Button>
      </form>
    </Box>
  );
};

export default AddUser;