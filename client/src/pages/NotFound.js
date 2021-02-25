import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="content">
        <h1 className="not-found">
          Maalesef böyle bir sayfa yok..!
          <br />
          <br />
          <Link to="/blog/tag/all" className="back">
            Blog'a dön!
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default NotFound;
