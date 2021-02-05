import React, { useContext, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Login.css";

function Login() {
  const [data, setData] = useState({
    username: null,
    password: null,
  });
  const history = useHistory();
  const { setIsLogin } = useContext(UserContext);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    if (data.username === "ardaberrun" && data.password === "12345") {
      setTimeout(() => {
        setIsLogin(true);
        history.push("/controller-page");
      }, 2500);
    }
  };

  return (
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
