import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Singup';
import Home from '../Components/Home/Home';
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';
import Navbar from "../Components/Navbar/Navbar";
import Blog from "../Components/Blog/Blog"
function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState("");
  
  const authenticateUser = async (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (storedUser && email === storedUser.email && password === storedUser.password) {
      console.log('Authentication successful');
      setAuthenticated(true);
      return { success: true };
    } else {
      return { success: false, error: "invalid_credentials" };
    }
  };
  
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthenticated(false);
    return <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Navbar authenticated={authenticated} handleLogout={handleLogout} />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login authenticateUser={authenticateUser} setAuthenticated={setAuthenticated} setError={setError} error={error} />} />
  <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated} setError={setError} />} />
  <Route path="/blog/*" element={<PrivateRoute Element={Blog} authenticated={authenticated} />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;
