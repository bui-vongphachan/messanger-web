"use client";

import { SendMessageQuery } from "@/hooks";
import Image from "next/image";
import microphoneIcon from "./send.svg";
import { useContext, useState } from "react";
import { UserContext } from "./context";
import { AuthenticationGateContext } from "@/components/authenticationGate";

const Footer = () => {
  const { user } = useContext(AuthenticationGateContext);

  const { selectedUser } = useContext(UserContext);

  const [content, setContent] = useState("");

  const [sendMessage, { data, error, loading }] = SendMessageQuery({
    senderId: user ? user._id : "",
    recipientId: selectedUser ? selectedUser._id : "",
    content: content,
  });

  return (
    <footer className="flex gap-4 items-center mt-auto justify-between py-4 px-8 bg-blue-950">
      <div className=" rounded-3xl w-full overflow-hidden">
        <input
          className=" text-sm w-full h-12 px-4 outline-none"
          onChange={(event) => setContent(event.target.value)}
          disabled={loading || !!error}
          value={content}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
              setContent("");
            }
          }}
        />
      </div>
      <button
        className=" bg-blue-800 hover:bg-blue-900 transition-colors px-2 rounded-full shrink-0 w-[48px] h-[48px] flex justify-center items-center"
        disabled={loading || !!error}
        onClick={() => {
          sendMessage();
          setContent("");
        }}
      >
        <Image
          src={microphoneIcon}
          width={24}
          height={24}
          className=" translate-x-[4px]"
          alt="Microfone"
        />
      </button>
    </footer>
  );
};

export default Footer;
