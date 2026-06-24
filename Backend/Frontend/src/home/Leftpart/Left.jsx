import React, { useState, useEffect, useRef } from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "../left1/Logout";
import useConversation from "../../statemanage/useConversation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

function Left() {
const { selectedConversation } = useConversation();

const [showMenu, setShowMenu] = useState(false);
const [showProfile, setShowProfile] = useState(false);
const [showSettings, setShowSettings] = useState(false);

const [darkMode, setDarkMode] = useState(
localStorage.getItem("darkMode") === "true"
);

const [chatTheme, setChatTheme] = useState(
  localStorage.getItem("chatTheme") || "green"
);

const [notificationSound, setNotificationSound] = useState(
localStorage.getItem("notificationSound") !== "false"
);

const menuRef = useRef(null);

const authUser = JSON.parse(localStorage.getItem("ChatApp"));

useEffect(() => {
localStorage.setItem("darkMode", darkMode);
}, [darkMode]);

useEffect(() => {
  localStorage.setItem("chatTheme", chatTheme);
}, [chatTheme]);

useEffect(() => {
localStorage.setItem(
"notificationSound",
notificationSound
);
}, [notificationSound]);

// Close menu when clicking outside
useEffect(() => {
const handleClickOutside = (event) => {
if (
menuRef.current &&
!menuRef.current.contains(event.target)
) {
setShowMenu(false);
}
};


document.addEventListener(
  "mousedown",
  handleClickOutside
);

return () => {
  document.removeEventListener(
    "mousedown",
    handleClickOutside
  );
};


}, []);

return (
<div
className={`         bg-[#2c3e50] text-gray-300
        w-full md:w-[30%]
        relative
        ${selectedConversation ? "hidden md:block" : "block"}
      `}
>
{/* Header */} <div className="flex items-center justify-between px-6 py-4"> <h1 className="font-bold text-3xl"> <span className="text-green-400">Chime</span> <span>Room</span> </h1>


    <button
      onClick={() => setShowMenu(!showMenu)}
      className="
        text-3xl
        hover:text-green-400
        transition-all
        duration-300
      "
    >
      <HiOutlineDotsVertical />
    </button>
  </div>

  {/* Profile Modal */}
  {showProfile && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
      <div className="bg-[#34495e] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">

        <div className="flex justify-end p-4">
          <button
            onClick={() => setShowProfile(false)}
            className="text-white text-xl hover:text-red-400"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center px-6 pb-8">

          <img
            src={`/${authUser?.user?.avatar}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-400 shadow-lg"
          />

          <h2 className="mt-4 text-2xl font-bold text-white">
            {authUser?.user?.fullname}
          </h2>

          <p className="text-gray-300 mt-1">
            {authUser?.user?.email}
          </p>

          <div className="mt-3 text-green-400 font-medium">
            ● Online
          </div>

          <div className="w-full mt-6 border-t border-white/10 pt-5">

            <div className="flex justify-between py-2 text-gray-300">
              <span>User ID</span>
              <span className="text-xs">
                {authUser?.user?._id?.slice(-6)}
              </span>
            </div>

            <div className="flex justify-between py-2 text-gray-300">
              <span>Status</span>
              <span className="text-green-400">
                Active
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )}

  {/* Settings Modal */}
  {showSettings && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
      <div className="bg-[#34495e] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">

        <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            Settings
          </h2>

          <button
            onClick={() => setShowSettings(false)}
            className="text-xl text-white hover:text-red-400"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-6">

          <div className="flex items-center justify-between">
            <span className="text-white">
              🌙 Dark Mode
            </span>

            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={darkMode}
              onChange={() =>
                setDarkMode(!darkMode)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white">
              🔔 Notification Sound
            </span>

            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={notificationSound}
              onChange={() =>
                setNotificationSound(
                  !notificationSound
                )
              }
            />
          </div>

          <div>
  <p className="text-white mb-3">
    🎨 Chat Wallpaper
  </p>

  <div className="grid grid-cols-2 gap-3">

    <button
      onClick={() => {
        setChatTheme("green");
        localStorage.setItem("chatTheme", "green");
        window.dispatchEvent(new Event("themeChanged"));
      }}
      className={`h-12 rounded-xl bg-[#d4f6e4]
      ${chatTheme === "green" ? "ring-4 ring-green-400" : ""}`}
    />

    <button
      onClick={() => {
        setChatTheme("blue");
        localStorage.setItem("chatTheme", "blue");
        window.dispatchEvent(new Event("themeChanged"));
      }}
      className={`h-12 rounded-xl bg-[#dceeff]
      ${chatTheme === "blue" ? "ring-4 ring-blue-400" : ""}`}
    />

    <button
      onClick={() => {
        setChatTheme("purple");
        localStorage.setItem("chatTheme", "purple");
        window.dispatchEvent(new Event("themeChanged"));
      }}
      className={`h-12 rounded-xl bg-[#f8e1ff]
      ${chatTheme === "purple" ? "ring-4 ring-purple-400" : ""}`}
    />

    <button
      onClick={() => {
        setChatTheme("midnight");
        localStorage.setItem("chatTheme", "midnight");
        window.dispatchEvent(new Event("themeChanged"));
      }}
      className={`h-12 rounded-xl bg-[#233142]
      ${chatTheme === "midnight" ? "ring-4 ring-cyan-400" : ""}`}
    />

  </div>
</div>

         <div className="border-t border-white/10 pt-4">
  <h3 className="text-white font-semibold text-lg">
    About ChimeRoom
  </h3>

  <p className="text-green-400 text-sm mt-2 font-medium">
    Version 1.0
  </p>

  <p className="text-gray-300 text-sm mt-2 leading-relaxed">
    ChimeRoom is a modern real-time messaging platform
    designed for seamless communication, instant message
    delivery, and a smooth user experience.
  </p>

  <div className="mt-4 bg-[#2c3e50] rounded-xl p-3">
    <p className="text-white font-medium">
      Developed by
    </p>

    <p className="text-green-400 font-bold text-lg">
      Mohd Aaqib
    </p>

    <p className="text-gray-400 text-xs mt-1">
      Computer Engineering (AI & ML)
      <br />
      Jamia Millia Islamia, New Delhi
    </p>
  </div>

  <p className="text-gray-500 text-xs mt-4 text-center">
    Powered by MERN Stack • Socket.IO • MongoDB Atlas
  </p>
</div>

        </div>
      </div>
    </div>
  )}

  {/* Premium Dropdown */}
  {showMenu && (
    <div
      ref={menuRef}
      className="
        absolute
        top-16
        right-4
        z-50
        w-64
        bg-[#34495e]
        rounded-3xl
        shadow-2xl
        border
        border-white/10
        overflow-hidden
        animate-fadeIn
      "
    >
      <div className="px-5 py-4 border-b border-white/10">
        <h2 className="font-semibold text-white text-lg">
          {authUser?.user?.fullname || "User"}
        </h2>

        <p className="text-xs text-green-400 mt-1">
          Online
        </p>
      </div>

      <button
        onClick={() => {
          setShowProfile(true);
          setShowMenu(false);
        }}
        className="
          w-full
          flex
          items-center
          gap-3
          px-5
          py-4
          hover:bg-[#415b76]
          transition-all
        "
      >
        <FaUserCircle className="text-xl" />
        <span>My Profile</span>
      </button>

      <button
        onClick={() => {
          setShowSettings(true);
          setShowMenu(false);
        }}
        className="
          w-full
          flex
          items-center
          gap-3
          px-5
          py-4
          hover:bg-[#415b76]
          transition-all
        "
      >
        <IoSettingsSharp className="text-xl" />
        <span>Settings</span>
      </button>

      <div className="border-t border-white/10" />

      <div className="p-2">
        <Logout />
      </div>
    </div>
  )}

  {/* Search */}
  <Search />

  {/* Users */}
  <div
    className="flex-1 overflow-y-auto"
    style={{ minHeight: "calc(84vh - 10vh)" }}
  >
    <Users />
  </div>
</div>


);
}

export default Left;
