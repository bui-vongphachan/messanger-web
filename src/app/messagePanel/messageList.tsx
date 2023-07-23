"use client";

import BottomScroller from "@/components/bottomScroller";
import { AllProps } from "../page";

const MessageList = (props: AllProps) => {
  const { getMessagesQueryResult, selectedUser, user } = props;

  const { data } = getMessagesQueryResult!;

  return (
    <div className="flex-1 flex flex-col justify-end overflow-hidden relative">
      <BottomScroller resetDependancy={selectedUser} onTopReached={() => {}}>
        {data?.getMessages.messages.map((message, index) => {
          const type = message.senderId === user?._id ? "out" : "in";

          const currentDate = new Date(message.sentDate);

          const hours = currentDate.getHours().toString().padStart(2, "0");
          const minutes = currentDate.getMinutes().toString().padStart(2, "0");

          return (
            <div key={index} data-value={type} className="message">
              <p className=" break-words py-1 text-sm leading-3 pr-10 relative">
                {message.content}
              </p>
              <div className="flex gap-1 items-center absolute right-2 bottom-1">
                <small className=" text-[10px] leading-3">
                  {`${hours}:${minutes}`}
                </small>
              </div>
            </div>
          );
        })}
      </BottomScroller>
    </div>
  );
};

export default MessageList;
