import {
  GetUsersQueryResponse,
  GetUserVariables,
  GET_USERS_QUERY_STRING,
  SendMessageQueryResponse,
} from "@/hooks";
import { graphqlClient } from "@/startups";
import { FetchResult } from "@apollo/client";

export const addNewMessageToCurrentChat = (
  result: FetchResult<
    SendMessageQueryResponse,
    Record<string, any>,
    Record<string, any>
  >
) => {
  const { sendMessage } = result.data!;

  graphqlClient.cache.updateQuery<GetUsersQueryResponse, GetUserVariables>(
    {
      query: GET_USERS_QUERY_STRING,
      variables: {
        userId: sendMessage.senderId as string,
      },
    },
    (data) => {
      if (!data) return;

      const currentChatIndex = data.getUsers.findIndex(
        (item) => item.user._id === sendMessage.recipientId
      );

      if (currentChatIndex === -1) return;

      let currentChat = data.getUsers[currentChatIndex];

      currentChat = {
        ...currentChat,
        latestMessage: sendMessage,
      };

      const newChatList = [...data.getUsers].filter(
        (_, index) => index !== currentChatIndex
      );

      newChatList.unshift(currentChat);

      return {
        getUsers: newChatList,
      };
    }
  );
};
