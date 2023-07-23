import {
  GetMessageQueryResponse,
  GetMessageVariables,
  GET_MESSAGE_QUERY_STRING,
  SendMessageQueryResponse,
} from "@/hooks";
import { graphqlClient } from "@/startups";
import { FetchResult } from "@apollo/client";

export const addNewMessageToConversation = (
  result: FetchResult<
    SendMessageQueryResponse,
    Record<string, any>,
    Record<string, any>
  >
) => {
  const { sendMessage } = result.data!;

  graphqlClient.cache.updateQuery<GetMessageQueryResponse, GetMessageVariables>(
    {
      query: GET_MESSAGE_QUERY_STRING,
      variables: {
        userId: sendMessage.senderId as string,
        partnerId: sendMessage.recipientId as string,
      },
    },
    (data) => {
      if (!data) return;

      const newList = [...data.getMessages.messages];

      newList.unshift(sendMessage);

      return {
        getMessages: {
          ...data.getMessages,
          messages: newList,
        },
      };
    }
  );
};
