import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ setAuthenticated, setError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // New state for signup success
  const navigate = useNavigate(); // Hook for navigation

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const registeredUser = async (name, email, password) => {
    // Simulate a successful signup
    if (name && email && password) {
      return { success: true };
    } else {
      return { success: false, error: 'registration_failed' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registeredUser(name, email, password);
      if (response.success) {
        localStorage.setItem("user", JSON.stringify({ email, password }));
        setSignupSuccess(true); // Set signup success to true
        setError(''); // Clear any previous error
        setTimeout(() => {
          setSignupSuccess(false); // Reset signup success after a delay
          navigate('/login'); // Redirect to login page after successful signup
        }, 3000); // Redirect after 3 seconds (adjust as needed)
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError(
        'An error occurred while processing your request. Please try again later.'
      );
    }
  };

  return (
    <section className="Form">
      <h1 className="Form_title">Sign Up</h1>
      {signupSuccess && <p className="success-message">Account created successfully.</p>} 
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button className="rounded-pill Btn" type="submit">
            SIGN UP
          </button>
        </div>
      </form>
      <div>
        <p className="form_text my-3">
          Already have an account?
          <Link to="/login">
            <span className="text_red">Login</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;