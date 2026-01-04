import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";


function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


const onSubmit = async (data) => {
  try {
    // 1️⃣ Firebase login
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    //  IMPORTANT: Reload user to get latest verification status
    await user.reload();

    // Email verified?
    if (!user.emailVerified) {
      toast.error("Please verify your email first.");
      return;
    }

    // 3 Backend login
    const response = await axios.post("/api/user/login", {
      email: data.email,
    });

    toast.success("Login successful");
    localStorage.setItem("ChatApp", JSON.stringify(response.data));
    setAuthUser(response.data);

  } catch (error) {
    toast.error("Login failed");
  }
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

            <h2 className="text-2xl items-center text-[#2c3e50]">
              Login with your{" "}
              <span className="text-[#2ecc71] font-semibold">Account</span>
            </h2>

            {/* Email */}
            <label className="flex items-center gap-3 bg-[#f1f1f1] px-4 py-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 text-gray-400"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>

              <input
                type="email"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
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
            <label className="flex items-center gap-3 bg-[#f1f1f1] px-4 py-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>

              <input
                type="password"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
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

            <button
              type="button"
              className="text-[#2ecc71] underline hover:text-[#27ae60] cursor-pointer ml-1 underline"
              onClick={async () => {
                if (auth.currentUser) {
                  await sendEmailVerification(auth.currentUser);
                  toast.success("Verification email resent");
                }
              }}
            >
              Resend verification email
            </button>


            <p className="text-center text-[#2c3e50]">
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
