"use client";

import { messages } from "../data";
import AutoScroll from "@brianmcallister/react-auto-scroll";
import { newMessageSubscribeOptions, useGetMessages } from "@/hooks";
import { UserContext } from "../page";
import { useContext, useEffect } from "react";
import { AuthenticationGateContext } from "@/components/authenticationGate";

const MessageList = () => {
  const { user } = useContext(AuthenticationGateContext);
  const { selectedConversation } = useContext(UserContext);

  const [getMessage, { data, loading, error, subscribeToMore, called }] =
    useGetMessages({
      conversationId: selectedConversation?._id!,
    });

  useEffect(() => {
    if (selectedConversation) getMessage();
  }, [selectedConversation, getMessage]);

  useEffect(() => {
    if (!called) return;

    const unsubscriber = subscribeToMore(newMessageSubscribeOptions);

    return () => {
      unsubscriber();
    };
  }, [subscribeToMore, called]);

  return (
    <section className="flex flex-col overflow-hidden flex-1">
      {/* Message List */}
      <AutoScroll
        showOption={false}
        className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-4"
      >
        {data?.getMessages.map((message, index) => {
          const type = message.senderId === user?._id ? "out" : "in";
          return (
            <div key={index} data-value={type} className="message">
              <span className=" text-sm leading-3 pr-10">
                {message.content}
              </span>
              <div className="flex gap-1 items-center absolute right-2 bottom-1">
                <small className=" text-[10px] leading-3">20:00</small>
              </div>
            </div>
          );
        })}
      </AutoScroll>
    </section>
  );
};

export default MessageList;
