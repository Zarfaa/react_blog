import { Link } from "react-router-dom";
import "./Navbar.css";

let Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg p-3">

      <div className="container-fluid d-flex ">

        <div className="logo">
        <Link to="/" >Authentication</Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"

        >
          <i className="fa-solid fa-bars Toggle_icon"></i>
        </button>

        <div className="collapse navbar-collapse justify-content-evenly" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active-link" to="/" exact>HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active-link" to="/login">LOGIN</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active-link" to="/signup">SIGNUP</Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
