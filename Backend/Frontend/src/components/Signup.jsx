import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

//  Firebase imports
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const [authUser, setAuthUser] = useAuth();

  //  Selected avatar state
  const [selectedAvatar, setSelectedAvatar] = React.useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };



  const onSubmit = async (data) => {
    try {
      //  Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      //  Send verification email
      // await sendEmailVerification(userCredential.user);

      const actionCodeSettings = {
        url: "http://localhost:5002/verify-email",   // ye 3001 se 5002 kiya hai
        handleCodeInApp: true,
      };

      console.log("VERIFY EMAIL REDIRECT URL =", actionCodeSettings.url);

      await sendEmailVerification(
        userCredential.user,
        actionCodeSettings
      );

      toast.success(
        "Verification email sent. Please verify your email (Check your inbox and spam).",
        {
          duration: 6000,
        }
      );


      //  Save user in MongoDB
      const userInfo = {
        fullname: data.fullname,
        email: data.email,
        avatar: selectedAvatar || "avatar1.png",
      };

      await axios.post("/api/user/signup", userInfo);

      reset();
      setSelectedAvatar("");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered. Please login.");
      } else {
        toast.error("Signup failed");
      }
    }
  };


  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-[#38d39f] to-[#38a4d3]">
      <div className="flex w-[85%] max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl">

        {/* Left side image */}
        <div className="w-1/2 bg-white flex items-center justify-center p-6">
          <img src="/myphoto.png" alt="profile" className="w-72 h-72 object-cover rounded-full shadow-xl" />
        </div>





        {/* Right side form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 px-10 py-10 space-y-4 bg-white"
        >
          <h1 className="text-2xl items-center font-bold">
            <span className="text-[#2ecc71]">Chime</span>
            <span className="text-[#2c3e50]">Room</span>
          </h1>
          <h2 className="text-xl text-gray-700 mb-6">
            Create a new <span className="text-[#2ecc71] font-semibold">Account</span>
          </h2>

          {/* Fullname */}
          <label className="input input-bordered flex items-center gap-2 bg-[#f1f1f1] px-3 py-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 text-gray-500" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow bg-transparent outline-none text-black placeholder-gray-400 focus:text-black"
              placeholder="Fullname"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && <p className="text-red-500 text-sm">This field is required</p>}

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2 bg-[#f1f1f1] px-3 py-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 text-gray-500" viewBox="0 0 16 16">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow bg-transparent outline-none text-black placeholder-gray-400 focus:text-black"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && <p className="text-red-500 text-sm">This field is required</p>}

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2 bg-[#f1f1f1] px-3 py-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 text-gray-500" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
            </svg>
            <input
              type="password"
              className="grow bg-transparent outline-none text-black placeholder-gray-400 focus:text-black"
              placeholder="Password"
              //  {...register("password", { required: true })}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}

            />
          </label>
          {/* {errors.password && <p className="text-red-500 text-sm">This field is required</p>} */}

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}


          {/* Confirm Password */}
          <label className="input input-bordered flex items-center gap-2 bg-[#f1f1f1] px-3 py-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 text-gray-500" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
            </svg>
            <input
              type="password"
              className="grow bg-transparent outline-none text-black placeholder-gray-400 focus:text-black"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}

          {/* Avatar Selection */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Choose an avatar:</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                "avatar1.png",
                "avatar2.png",
                "avatar3.png",
                "avatar4.png",
                "avatar5.png",
                "avatar6.png",
                "avatar7.png",
              ].map((avatarName) => (
                <img
                  key={avatarName}
                  src={`/${avatarName}`}
                  alt={avatarName}
                  onClick={() => setSelectedAvatar(avatarName)}
                  className={`w-16 h-16 rounded-full cursor-pointer border-4 transition ${selectedAvatar === avatarName ? "border-blue-500" : "border-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            value="Signup"
            className="w-full bg-[#2ecc71] text-white font-semibold py-2 rounded-md cursor-pointer hover:bg-[#2d8fbd] transition"
          />

          <p className="text-sm mt-3 text-gray-600">
            Already have an account?
            <Link to="/login" className="ml-1 text-[#36ea81] underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
