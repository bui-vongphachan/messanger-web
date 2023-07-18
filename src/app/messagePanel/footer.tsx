"use client";

import {
  SendMessageQueryResponse,
  SendMessageVariables,
  SEND_MESSAGE_QUERY_STRING,
} from "@/hooks";
import Image from "next/image";
import microphoneIcon from "../send.svg";
import { useContext, useRef, useState, useCallback, useEffect } from "react";
import { UserContext, MessageContext } from "../contexts";
import { AuthenticationGateContext } from "@/components/authenticationGate";
import { useMutation } from "@apollo/client";

const Footer = () => {
  const { user } = useContext(AuthenticationGateContext);

  const { queryResult } = useContext(MessageContext);

  const { selectedUser } = useContext(UserContext);

  const [content, setContent] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const [sendMessage, { error, loading }] = useMutation<
    SendMessageQueryResponse,
    SendMessageVariables
  >(SEND_MESSAGE_QUERY_STRING, {
    variables: {
      senderId: user ? user._id : "",
      recipientId: selectedUser ? selectedUser.user._id : "",
      content: content,
    },
    onCompleted: (data) => {
      const { sendMessage } = data;
      queryResult?.updateQuery((prev) => {
        if (!sendMessage) return prev;

        let newMessagesList = [...prev.getMessages.messages];

        newMessagesList.unshift(sendMessage);

        return {
          getMessages: {
            isEndOfConversation: prev.getMessages.isEndOfConversation,
            messages: newMessagesList,
          },
        };
      });
    },
  });

  const send = useCallback(() => {
    if (!content) return;

    if (content.replaceAll(" ", "").length === 0) return;

    sendMessage();

    setContent("");
  }, [sendMessage, content]);

  useEffect(() => {
    const ref = inputRef.current;

    if (!ref) return;

    ref?.focus();

    return () => ref?.blur();
  });

  return (
    <footer className="bg-gray-100">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
        className="flex gap-4 items-center mt-auto justify-between py-4 px-8"
      >
        <div className=" rounded-3xl w-full overflow-hidden">
          <input
            ref={inputRef}
            className=" transition-colors bg-gray-200 text-sm w-full h-12 px-4 outline-none"
            onChange={(event) => setContent(event.target.value)}
            disabled={loading || !!error}
            value={content}
          />
        </div>
        <button
          type="submit"
          className=" bg-gray-400 hover:bg-gray-600 transition-colors px-2 rounded-full shrink-0 w-[48px] h-[48px] flex justify-center items-center"
          disabled={loading || !!error}
          onClick={() => send()}
        >
          <Image
            src={microphoneIcon}
            width={24}
            height={24}
            className=" translate-x-[4px]"
            alt="Microfone"
          />
        </button>
      </form>
    </footer>
  );
};

export default Footer;
