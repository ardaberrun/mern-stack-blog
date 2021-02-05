import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="content">
        <h1 className="not-found">
          Maalesef böyle bir sayfa yok..!
          <br />
          <br />
          <Link to="/blog" className="back">
            Blog'a dön!
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default NotFound;
