import { GetUsersQueryResponse } from "@/hooks";
import { Chat, User } from "@/types";
import { QueryResult, OperationVariables } from "@apollo/client";
import { moveCurrentChatToTopOfList } from "./moveCurrentChatToTopOfList";

export const addNewMessageToCurrentChat = (props: {
  queryResult: QueryResult<GetUsersQueryResponse, OperationVariables> | null;
  currentChat: Chat | null;
  user: User | null;
  newContent: string;
}) => {
  if (!props.queryResult) return;

  props.queryResult.updateQuery((prev) => {
    const index = prev.getUsers.findIndex(
      (item) => item.user._id === props.currentChat?.user._id
    );

    if (index === -1) return prev;

    let currentChat = prev.getUsers[index];

    /* ------------------------------------------------------------------------------------------------------------------ */
    /* add current message to chat's latest message                                                                       */
    /* ------------------------------------------------------------------------------------------------------------------ */
    if (!currentChat.latestMessage) {
      currentChat = {
        ...currentChat,
        latestMessage: {
          content: props.newContent,
          senderId: props.user ? props.user._id : "",
          recipientId: props.currentChat ? props.currentChat.user._id : "",
          sentDate: new Date(),
          _id: "",
          previousMessageId: null,
          isRead: false,
        },
      };
    } else {
      currentChat = {
        ...currentChat,
        latestMessage: {
          ...currentChat.latestMessage,
          content: props.newContent,
          sentDate: new Date(),
          isRead: true,
          previousMessageId: null,
        },
      };
    }

    const newUsers = moveCurrentChatToTopOfList({
      items: prev.getUsers,
      index,
      targetItem: currentChat,
    });

    return {
      getUsers: newUsers as any,
    };
  });

  return;
};
