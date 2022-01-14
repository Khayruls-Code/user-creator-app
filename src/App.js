import Login from "./pages/Login/Login";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/components/Users/Users";
import AddUser from "./pages/components/AddUser/AddUser";
import AdminRoute from "./AdminRoute/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<AdminRoute><Dashboard /></AdminRoute>}>
            <Route index element={<Users />} />
            <Route path='allUsers' element={<Users />} />
            <Route path='addUser' element={<AddUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
