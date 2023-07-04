"use client";

import { AuthenticationGateContext } from "@/components/authenticationGate";
import AutoScroll from "@brianmcallister/react-auto-scroll";
import { useContext } from "react";
import { MessageContext } from "./context";

const MessageList = () => {
  const { queryResult } = useContext(MessageContext);
  const { user } = useContext(AuthenticationGateContext);

  const { data } = queryResult!;

  return (
    <section className="flex flex-col overflow-hidden flex-1">
      {/* Message List */}
      <AutoScroll
        showOption={false}
        className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-4"
      >
        {data?.getMessages.map((message, index) => {
          const type = message.senderId === user?._id ? "out" : "in";

          const currentDate = new Date(message.sentDate);

          const hours = currentDate.getHours().toString().padStart(2, "0");
          const minutes = currentDate.getMinutes().toString().padStart(2, "0");

          return (
            <div key={index} data-value={type} className="message">
              <span className=" text-sm leading-3 pr-10">
                {message.content}
              </span>
              <div className="flex gap-1 items-center absolute right-2 bottom-1">
                <small className=" text-[10px] leading-3">
                  {`${hours}:${minutes}`}
                </small>
              </div>
            </div>
          );
        })}
      </AutoScroll>
    </section>
  );
};

export default MessageList;
