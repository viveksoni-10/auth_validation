import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../store/auth";

function Navbar() {
  const { isLoggedIn } = useAuth();

  const getActiveClass = ({ isActive }) => (isActive ? "nav-active" : "");

  return (
    <header className="main-header">
      <div className="main-container">
        <div className="main-logo">
          <NavLink to="/" className="main-logo-link">Logo</NavLink>
        </div>
        <nav className="main-nav">
          <ul className="main-menu">
            <li>
              <NavLink to="/" className={getActiveClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getActiveClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/service" className={getActiveClass}>
                Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={getActiveClass}>
                Contact
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout" className={getActiveClass}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={getActiveClass}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={getActiveClass}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
