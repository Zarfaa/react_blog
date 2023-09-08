import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = ({ setError }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signupSuccess, setSignupSuccess] = useState(false);
  const id = users.length;
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const registeredUser = (name, email, password) => {
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
      let newUser = [];
      if (response.success) {
        newUser = {
          id: id + 1,
          name: name,
          email: email,
          password: password
        }
        setUsers([newUser, ...users])
        setSignupSuccess(true);
        localStorage.setItem("user", JSON.stringify({ id: newUser.id }));
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } else {
        setError(response.error);
      }
      setTimeout(() => {
        setSignupSuccess(false);
      }, 1000);
    } catch (error) {
      console.log("Error", error);
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
