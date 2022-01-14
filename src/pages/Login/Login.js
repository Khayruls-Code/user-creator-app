import { Box, TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import '../style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

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

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signInUser, error } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const handleSignIn = (e) => {
    e.preventDefault()
    if (error.length) {
      alert('Invailed Email or Password')
      return
    }
    signInUser(email, password, location, navigate)
  }

  return (
    <Box className='login'>
      <Box className='form-container'>
        <Typography sx={{ textAlign: "center" }} variant='h4'>Login</Typography>
        <form onSubmit={handleSignIn}>
          <TextField
            required
            label="Email"
            type="email"
            sx={{ width: "100%", my: 2 }}
            onBlur={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ width: "100%", mt: 2, mb: 4 }}
            onBlur={(e) => setPassword(e.target.value)}
          />
          <Button type='submit' style={styles.root} >Submit</Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;