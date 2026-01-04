import React from "react";
import Search from "./Search";
import Users from "./Users";
 

function Left() {
  return (
    <div className="w-[30%] bg-[#2c3e50] text-gray-300">  
      <h1 className="font-bold text-3xl p-2 px-11">
        <span className="text-green-400">Chime</span>
        <span>Room</span>
      </h1>
      <Search />
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
