import { applyActionCode } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


useEffect(() => {
  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");

  // Case 1: Missing or invalid params
  if (!oobCode || mode !== "verifyEmail") {
    toast.success(
      "Email already verified. Please login with your email and password.",
      { duration: 5000 }
    );
    setTimeout(() => navigate("/login"), 2000);
    return;
  }

  applyActionCode(auth, oobCode)
    .then(() => {
      toast.success(
        "Email verified successfully. Login with your email and password.",
        { duration: 5000 }
      );
      setTimeout(() => navigate("/login"), 2000);
    })
    .catch(() => {
      //  IMPORTANT CHANGE HERE
      toast.success(
        "Email already verified. Please login with your email and password.",
        { duration: 5000 }
      );
      setTimeout(() => navigate("/login"), 2000);
    });
}, []);



 return (
  <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-[#38d39f] to-[#38a4d3]">
    <div className="bg-white px-10 py-8 rounded-xl shadow-2xl text-center w-[90%] max-w-md">
      
      {/* App Name */}
      <h1 className="text-2xl font-bold mb-4">
        <span className="text-[#2ecc71]">Chime</span>
        <span className="text-[#2c3e50]">Room</span>
      </h1>

      {/* Message */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Verifying your email…
      </h2>

      <p className="text-sm text-gray-500">
        Please wait while we confirm your email address.
      </p>

      {/* Loader */}
      <div className="mt-6 flex justify-center">
        <span className="loading loading-spinner loading-md text-[#2ecc71]"></span>
      </div>
    </div>
  </div>
);

}

export default VerifyEmail;
