import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth()
  let location = useLocation();
  if (isLoading) {
    return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}><CircularProgress /></Box>
  }
  if (user.email) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default AdminRoute;