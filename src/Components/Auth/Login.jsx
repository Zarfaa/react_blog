import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const getUserIdFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  console.log("Retrieved userId from local storage:", userId);
  return userId;
};

export const getUsersFromLocalStorage = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users;
};


const Login = ({ authenticateUser, setAuthenticated, setError, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authenticateUser(email, password);
      if (response.success) {
        const userId = getUserIdFromLocalStorage(); 
        const user = { email, password, id: userId };
        localStorage.setItem("user", JSON.stringify(user)); 
        console.log(user);
        setAuthenticated(true);
        setLoginSuccess(true);
        setError("");
        setTimeout(() => {
          console.log("Redirecting to /posts");
          navigate("/posts");
          setLoginSuccess(false);
          setAuthenticated(true);
        }, 1000);
      } else {
        setError(response.error || "An unknown error occurred.");
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message); 
      setLoginSuccess(false);
    }
  };
  
  

  return (
    <section className="Form">
      <h1 className="Form_title">Login</h1>
      {loginSuccess && (
        <p className="success-message">Login successful.</p>
      )}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
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
          </div>
          <div>
            <button className="rounded-pill Btn" type="submit">
              LOGIN
            </button>
          </div>
      </form>
      <div>
        <p className="form_text my-3">
          Don't have an account?
          <Link to="/signup">
            <span className="text_red">SIGNUP</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;