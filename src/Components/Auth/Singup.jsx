import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({setError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate(); 

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
        localStorage.setItem("user", JSON.stringify({name, email, password }));
        setSignupSuccess(true); 
        setError(''); 
        setTimeout(() => {
          setSignupSuccess(false);
          navigate('/login');
        }, 1000); 
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
