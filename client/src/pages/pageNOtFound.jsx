
import { Link } from "react-router-dom";

export const PageNotFound = ()=> {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for doesn’t exist.</p>
      <Link to="/" className="home-link">Go Back Home</Link>
      <Link to="/contact" className="home-link">Go Back Contact</Link>
    </div>
  );
}
