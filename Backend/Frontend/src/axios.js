// // src/axios.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5002", // your backend origin
//   withCredentials: true,            //  send JWT cookie on every request
// });

// export default api;


import axios from "axios";

// This checks if the app is running on your computer or on Render
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5002" 
  : "https://chimeroom-chatapp.onrender.com";

const api = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true, // send JWT cookie on every request
});

export default api;