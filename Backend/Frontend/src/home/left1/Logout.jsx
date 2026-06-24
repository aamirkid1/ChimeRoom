import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { TbLogout2 } from "react-icons/tb";

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await axios.post("/api/user/logout");

      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");

      toast.success("Logged out successfully");

      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        text-left
        text-red-400
        hover:bg-red-500/10
        rounded-lg
        transition-all
        duration-300
      "
    >
      <TbLogout2 className="text-xl" />

      <span>
        {loading ? "Logging out..." : "Logout"}
      </span>
    </button>
  );
}

export default Logout;