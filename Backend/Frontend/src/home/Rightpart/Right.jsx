import React, { useEffect, useState } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } =
    useConversation();

  const [chatTheme, setChatTheme] = useState(
    localStorage.getItem("chatTheme") || "green"
  );

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  // Listen for theme changes
  useEffect(() => {
    const updateTheme = () => {
      setChatTheme(
        localStorage.getItem("chatTheme") || "green"
      );
    };

    window.addEventListener(
      "themeChanged",
      updateTheme
    );

    return () => {
      window.removeEventListener(
        "themeChanged",
        updateTheme
      );
    };
  }, []);

  const getBackground = () => {
    switch (chatTheme) {
      case "blue":
        return {
          background:
            "linear-gradient(180deg,#d8ebff 0%,#c6e7ff 100%)",
        };

      case "purple":
        return {
          background:
            "linear-gradient(180deg,#efdfff 0%,#e6d1ff 100%)",
        };

      case "midnight":
        return {
          background:
            "linear-gradient(180deg,#233142 0%,#1b2735 100%)",
        };

      default:
        return {
          background:
            "linear-gradient(180deg,#d8f3dc 0%,#c7f9cc 100%)",
        };
    }
  };

  return (
    <div
      className={`
        text-white
        w-full
        ${!selectedConversation ? "hidden md:block" : "block"}
      `}
      style={{
        ...getBackground(),
      }}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />

          <div
            className="flex-1 overflow-y-auto"
            style={{
              maxHeight: "calc(88vh - 8vh)",
            }}
          >
            <Messages />
          </div>

          <Typesend />
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="relative">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>

      <div className="flex h-screen items-center justify-center text-[#1a2421]">
        <h1 className="text-center">
          Welcome{" "}
          <span className="font-semibold text-xl">
            {authUser.user.fullname}
          </span>

          <br />

          No chat selected, please start conversation
          by selecting anyone from your contacts
        </h1>
      </div>
    </div>
  );
};