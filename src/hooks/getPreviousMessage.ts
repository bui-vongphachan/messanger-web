import { AnyData, Message } from "@/types";
import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface QueryResponse {
  getPreviousMessages: { isEndOfConversation: boolean; messages: Message[] };
}

interface Variables extends AnyData {
  currentMessageId?: string;
}

export const useGetPreviousMessageQuery = (props: Variables) => {
  return useLazyQuery<QueryResponse, Variables>(QUERY_STRING, {
    variables: props,
  });
};

const QUERY_STRING = gql`
  query GetPreviousMessages($currentMessageId: ID!) {
    getPreviousMessages(currentMessageId: $currentMessageId) {
      isEndOfConversation
      messages {
        _id
        content
        senderId
        recipientId
        previousMessageId
        sentDate
        isRead
      }
    }
  }
`;
