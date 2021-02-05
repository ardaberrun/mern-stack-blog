import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SECRET_URL}`,
});

export default API;
