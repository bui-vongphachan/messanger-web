"use client";

import { AuthenticationGateContext } from "@/components/authenticationGate";
import { useCallback, useContext } from "react";
import { MessageContext, UserContext } from "../contexts";
import BottomScroller from "@/components/bottomScroller";
import { useGetPreviousMessageQuery } from "@/hooks";

const MessageList = () => {
  const { queryResult } = useContext(MessageContext);

  const { selectedUser } = useContext(UserContext);

  const { user } = useContext(AuthenticationGateContext);

  const [getPreviousMessage, { loading: gettingPreviousMessage }] =
    useGetPreviousMessageQuery({});

  const getPreviousMessageCaller = useCallback(async () => {
    if (gettingPreviousMessage) return;

    if (!queryResult) return;

    if (!queryResult.data) return;

    if (!queryResult.data.getMessages) return;

    if (queryResult.data.getMessages.isEndOfConversation) return;

    if (queryResult.data.getMessages.isEndOfConversation) return;

    if (!queryResult.data.getMessages.messages) return;

    const { data: previousMessageData } = await getPreviousMessage({
      variables: {
        currentMessageId:
          queryResult.data.getMessages.messages[
            queryResult.data.getMessages.messages.length - 1
          ]._id,
      },
    });

    if (!previousMessageData) return;

    queryResult.updateQuery((prev) => {
      const newMessages = [
        ...prev.getMessages.messages,
        ...previousMessageData.getPreviousMessages.messages,
      ];

      return {
        getMessages: {
          isEndOfConversation:
            previousMessageData.getPreviousMessages.isEndOfConversation,
          messages: newMessages,
        },
      };
    });
  }, [getPreviousMessage, queryResult, gettingPreviousMessage]);

  const { data } = queryResult!;

  return (
    <div className="flex-1 flex flex-col justify-end overflow-hidden relative">
      <BottomScroller
        resetDependancy={selectedUser}
        onTopReached={getPreviousMessageCaller}
      >
        {data?.getMessages.messages.map((message, index) => {
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
      </BottomScroller>
    </div>
  );
};

export default MessageList;
