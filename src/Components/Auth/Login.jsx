import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
        localStorage.setItem("user", JSON.stringify({ email }));
        setLoginSuccess(true);
        setError(""); // Clear any previous error
        setTimeout(() => {
          setLoginSuccess(false);
          setAuthenticated(true);
          navigate("/blog");
        }, 3000);
      } else {
        setError(response.error || "An unknown error occurred.");
        setLoginSuccess(false); // Reset login success
      }
    } catch (error) {
      setError(
        error.message === "Network Error"
          ? "Network error. Please check your internet connection and try again."
          : "An error occurred while processing your request. Please try again later."
      );
      setLoginSuccess(false); // Reset login success
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
