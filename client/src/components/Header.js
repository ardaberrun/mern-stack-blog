import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <Link to="/blog">ardaberrun</Link>
      </h1>
      <nav>
        <Link to="/blog/tag/yazilim">Yazılım</Link>
        <Link to="/blog/tag/diger">ve Diğerleri</Link>
      </nav>
    </header>
  );
}

export default Header;
