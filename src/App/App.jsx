import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Singup';
import Home from '../Components/Home/Home';
import Navbar from "../Components/Navbar/Navbar";
import Posts from "../Components/Posts/Posts"
import {getUsersFromLocalStorage} from "../Components/Auth/Login"
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setAuthenticated(true);
    }
  }, []);

  const authenticateUser = (email, password) => {
    const storedUsers = getUsersFromLocalStorage();
    const findUser = storedUsers.find((user) => user.email === email && user.password === password);
    if (findUser) {
      setAuthenticated(true);
      return { success: true };
    } else {
      throw new Error("Invalid credentials");
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Navbar authenticated={authenticated} handleLogout={handleLogout} />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login authenticateUser={authenticateUser} setAuthenticated={setAuthenticated} setError={setError} error={error} />} />
  <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated} setError={setError} />} />
  <Route path="/posts" element={<Posts authenticated={authenticated} />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
