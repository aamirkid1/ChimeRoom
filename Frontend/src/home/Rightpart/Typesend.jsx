import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] border-[1px] bg-[#2c3e50]">
        <div className=" w-[70%] mx-4 ">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-[1px] border-[#95a5a6]  placeholder-[#2c3e50] flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-[#7f948c] mt-1"
          />
        </div>
       <button className="hover:bg-[#2ecc71]  p-2 rounded transition duration-200">
  <IoSend className="text-3xl" />
</button>

      </div>
    </form>
  );
}

export default Typesend;
