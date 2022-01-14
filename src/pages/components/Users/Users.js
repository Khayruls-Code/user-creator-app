import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeleteUser, getUser } from '../../../redux/user/userAction';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const users = useSelector(state => state.users.users)
  const errorMessege = useSelector(state => state.users.error)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //getting users
  useEffect(() => {
    dispatch(getUser())
    if (errorMessege) {
      navigate('/login')
      console.log(errorMessege)
    }
  }, [])

  //delete user
  const handleDelete = (id) => {
    const makeSure = window.confirm('Are you sure to want to delete this user?')
    if (makeSure) {
      dispatch(getDeleteUser(id))
      alert('Successfully deleted user')
    }
  }

  if (!users.length) {
    return <div style={{ fontSize: "20px", }}>No user added, please add a use frist!</div>
  }
  console.log(errorMessege)
  let serial = 1;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{serial++}</TableCell>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <button onClick={() => handleDelete(user._id)} className='deleteBtn'>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;