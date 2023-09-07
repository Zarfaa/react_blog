import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Singup';
import Home from '../Components/Home/Home';
import Navbar from "../Components/Navbar/Navbar";
import Blog from "../Components/Blog/Blog"
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setAuthenticated(true);
    }
  }, []);

  const authenticateUser = (name, email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && name === storedUser.name && email === storedUser.email && password === storedUser.password) {
      console.log('Authentication successful');
      setAuthenticated(true);
      return { success: true };
    } else {
      return { success: false, error: 'invalid_credentials' };
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
  <Route path="/blog" element={<Blog authenticated={authenticated} />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
