import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <span>404</span>
      <h1>Page not found</h1>
      <p>The page you requested doesn't exist.</p>
      <Link to="/">Back to discovery</Link>
    </div>
  );
}
