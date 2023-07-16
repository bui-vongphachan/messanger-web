"use client";

import { AuthenticationGateContext } from "@/components/authenticationGate";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../contexts";
import { GetMessageQueryResponse } from "@/hooks";

const MessageList = () => {
  const { queryResult } = useContext(MessageContext);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const divRef = useRef<HTMLDivElement>(null);
  const buttomRef = useRef<HTMLDivElement>(null);

  const { data } = queryResult!;

  const checkScroll = () => {
    const div = divRef.current;

    if (!div) return;

    if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
      return setIsAtBottom(true);
    }

    setIsAtBottom(false);
  };

  useEffect(() => {
    const div = divRef.current;

    if (!div) return;

    div.addEventListener("scroll", checkScroll);

    return () => {
      div.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    const div = divRef.current;

    if (!div) return;

    if (!isAtBottom) return;

    div.scrollTop = div.scrollHeight;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div
        ref={divRef}
        className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-4"
      >
        <MapContent data={data} />
        <div ref={buttomRef} id="bottom" className=" hidden">
          bottom
        </div>
      </div>
    </div>
  );
};

const MapContent = (props: { data: GetMessageQueryResponse | undefined }) => {
  const { data } = props;

  const { user } = useContext(AuthenticationGateContext);

  return (
    <Fragment>
      {data?.getMessages.map((message, index) => {
        const type = message.senderId === user?._id ? "out" : "in";

        const currentDate = new Date(message.sentDate);

        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");

        return (
          <div key={index} data-value={type} className="message">
            <span className=" text-sm leading-3 pr-10">{message.content}</span>
            <div className="flex gap-1 items-center absolute right-2 bottom-1">
              <small className=" text-[10px] leading-3">
                {`${hours}:${minutes}`}
              </small>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default MessageList;
