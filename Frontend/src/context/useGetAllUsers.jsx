// import { useEffect, useState } from "react";
// import axios from "axios";

// const useGetAllUsers = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUsers = async () => {
//       const authUser = JSON.parse(localStorage.getItem("ChatApp"));
//       try {
//         const res = await axios.get("/api/user/allusers", {
//           headers: {
//             Authorization: `Bearer ${authUser?.token}`,
//           },
//         });
//         setAllUsers(res.data);
//       } catch (err) {
//         console.error("Failed to fetch users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);

//   return [allUsers, loading];
// };

// export default useGetAllUsers;


// // import React, { useEffect, useState } from "react";
// // import Cookies from "js-cookie";
// // import axios from "axios";
// // function useGetAllUsers() {
// //   const [allUsers, setAllUsers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   useEffect(() => {
// //     const getUsers = async () => {
// //       setLoading(true);
// //       try {
// //         const token = Cookies.get("jwt");
// //         const response = await axios.get("/api/user/allusers", {
// //           credentials: "include",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setAllUsers(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.log("Error in useGetAllUsers: " + error);
// //       }
// //     };
// //     getUsers();
// //   }, []);
// //   return [allUsers, loading];
// // }

// // export default useGetAllUsers;


import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers", {
          withCredentials: true, // ✅ correct for Axios
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
