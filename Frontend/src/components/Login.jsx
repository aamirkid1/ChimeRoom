import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };


  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="flex items-center gap-8 bg-white px-10 py-8 rounded-xl shadow-lg">

          {/* Profile Image */}

          <div className="w-1/2 bg-white flex items-center justify-center p-6">
            <img src="/myphoto.png" alt="profile" className="w-72 h-72 object-cover rounded-full shadow-xl" />
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-black px-6 py-2 rounded-md space-y-3 w-96"
          >
            <h1 className="text-2xl items-center font-bold">
              <span className="text-[#2ecc71]">Chime</span>
              <span className="text-[#2c3e50]">Room</span>
            </h1>

            <h2 className="text-2xl items-center">
              Login with your{" "}
              <span className="text-[#2ecc71] font-semibold">Account</span>
            </h2>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </label>
            {errors.email && (
              <span className="text-red-500 text-sm font-semibold">
                This field is required
              </span>
            )}

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </label>
            {errors.password && (
              <span className="text-red-500 text-sm font-semibold">
                This field is required
              </span>
            )}

            {/* Login Button */}
            <div className="flex justify-center">
              <input
                type="submit"
                value="Login"
                className="text-white bg-[#2ecc71] hover:bg-[#27ae60] cursor-pointer w-full rounded-lg py-2 transition"
              />
            </div>

            <p className="text-center">
              Don't have any Account?
              <Link
                to={"/signup"}
                className="text-[#2ecc71] underline hover:text-[#27ae60] cursor-pointer ml-1"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

// import axios from "axios";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AuthProvider";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// function Login() {
//   const [authUser, setAuthUser] = useAuth();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const userInfo = {
//       email: data.email,
//       password: data.password,
//     };

//     try {
//       setLoading(true);
//       const response = await axios.post("/api/user/login", userInfo);
//       if (response.data) {
//         toast.success("Login successful");
//         localStorage.setItem("ChatApp", JSON.stringify(response.data));
//         setAuthUser(response.data);
//       }
//     } catch (error) {
//       if (error.response?.data?.error) {
//         toast.error("Error: " + error.response.data.error);
//       } else {
//         toast.error("Login failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex h-screen items-center justify-center bg-gray-100">
//         <div className="flex items-center gap-8 bg-white px-10 py-8 rounded-xl shadow-lg">

//           {/* Profile Image */}
//           <div className="w-1/2 bg-white flex items-center justify-center p-6">
//             <img src="/myphoto.png" alt="profile" className="w-72 h-72 object-cover rounded-full shadow-xl" />
//           </div>

//           {/* Login Form */}
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="border border-black px-6 py-2 rounded-md space-y-3 w-96"
//           >
//             <h1 className="text-2xl items-center font-bold">
//               <span className="text-[#2ecc71]">Chime</span>
//               <span className="text-[#2c3e50]">Room</span>
//             </h1>

//             <h2 className="text-2xl items-center">
//               Login with your{" "}
//               <span className="text-[#2ecc71] font-semibold">Account</span>
//             </h2>

//             {/* Email */}
//             <label className="input input-bordered flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//                 className="w-4 h-4 opacity-70"
//               >
//                 <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                 <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//               </svg>
//               <input
//                 type="text"
//                 className="grow"
//                 placeholder="Email"
//                 {...register("email", { required: true })}
//               />
//             </label>
//             {errors.email && (
//               <span className="text-red-500 text-sm font-semibold">
//                 This field is required
//               </span>
//             )}

//             {/* Password */}
//             <label className="input input-bordered flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//                 className="w-4 h-4 opacity-70"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <input
//                 type="password"
//                 className="grow"
//                 placeholder="Password"
//                 {...register("password", { required: true })}
//               />
//             </label>
//             {errors.password && (
//               <span className="text-red-500 text-sm font-semibold">
//                 This field is required
//               </span>
//             )}

//             {/* Login Button */}
//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="text-white bg-[#2ecc71] hover:bg-[#27ae60] cursor-pointer w-full rounded-lg py-2 transition"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </div>

//             <p className="text-center">
//               Don't have any Account?
//               <Link
//                 to={"/signup"}
//                 className="text-[#2ecc71] underline hover:text-[#27ae60] cursor-pointer ml-1"
//               >
//                 Signup
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;


// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AuthProvider";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// function Login() {
//   const [authUser, setAuthUser] = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const userInfo = {
//       email: data.email,
//       password: data.password,
//     };

//     axios
//       .post("/api/user/login", userInfo)
//       .then((response) => {
//         if (response.data) {
//           toast.success("Login successful");
//         }
//         localStorage.setItem("ChatApp", JSON.stringify(response.data));
//         setAuthUser(response.data);
//       })
//       .catch((error) => {
//         if (error.response) {
//           toast.error("Error: " + error.response.data.error);
//         }
//       });
//   };


//   return (
//     <>
//       <div className="flex h-screen items-center justify-center bg-gray-100">
//         <div className="flex items-center gap-8 bg-white px-10 py-8 rounded-xl shadow-lg">

//           {/* Profile Image */}

//           <div className="w-1/2 bg-white flex items-center justify-center p-6">
//             <img src="/myphoto.png" alt="profile" className="w-72 h-72 object-cover rounded-full shadow-xl" />
//           </div>

//           {/* Login Form */}
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="border border-black px-6 py-2 rounded-md space-y-3 w-96"
//           >
//             <h1 className="text-2xl items-center font-bold">
//               <span className="text-[#2ecc71]">Chime</span>
//               <span className="text-[#2c3e50]">Room</span>
//             </h1>

//             <h2 className="text-2xl items-center">
//               Login with your{" "}
//               <span className="text-[#2ecc71] font-semibold">Account</span>
//             </h2>

//             {/* Email */}
//             <label className="input input-bordered flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//                 className="w-4 h-4 opacity-70"
//               >
//                 <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                 <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//               </svg>
//               <input
//                 type="text"
//                 className="grow"
//                 placeholder="Email"
//                 {...register("email", { required: true })}
//               />
//             </label>
//             {errors.email && (
//               <span className="text-red-500 text-sm font-semibold">
//                 This field is required
//               </span>
//             )}

//             {/* Password */}
//             <label className="input input-bordered flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//                 className="w-4 h-4 opacity-70"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <input
//                 type="password"
//                 className="grow"
//                 placeholder="Password"
//                 {...register("password", { required: true })}
//               />
//             </label>
//             {errors.password && (
//               <span className="text-red-500 text-sm font-semibold">
//                 This field is required
//               </span>
//             )}

//             {/* Login Button */}
//             <div className="flex justify-center">
//               <input
//                 type="submit"
//                 value="Login"
//                 className="text-white bg-[#2ecc71] hover:bg-[#27ae60] cursor-pointer w-full rounded-lg py-2 transition"
//               />
//             </div>

//             <p className="text-center">
//               Don't have any Account?
//               <Link
//                 to={"/signup"}
//                 className="text-[#2ecc71] underline hover:text-[#27ae60] cursor-pointer ml-1"
//               >
//                 Signup
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;