import React, { useContext, useState } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Login.css";
import API from "../api/api";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const { setIsLogin } = useContext(UserContext);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    API.post("/login", data)
      .then((res) => {
        if (res.data.isAdmin) {
          setIsLogin(true);
          localStorage.setItem("x-auth-token", res.data.token);
        }
      })
      .catch((err) => console.log(err));

    history.push("/blog/tag/all");
  };

  return localStorage.getItem("x-auth-token") ? (
    <h1>
      Zaten Giriş Yaptınız! <Link to="/blog/tag/all">Sayfaya Dön!</Link>
    </h1>
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="username"
        type="text"
        autoComplete="off"
        required
        onChange={handleChange}
      />
      <input
        name="password"
        placeholder="password"
        type="password"
        autoComplete="off"
        required
        onChange={handleChange}
      />
      <input value="Giriş" type="submit" />
    </form>
  );
}

export default withRouter(Login);
