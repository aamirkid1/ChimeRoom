// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002", // your backend origin
  withCredentials: true,            //  send JWT cookie on every request
});

export default api;
