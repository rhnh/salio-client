import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about" className="nav-right">
            about
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="nav-right">
            contacts
          </Link>
        </li>
      </ul>
    </div>
  );
}
