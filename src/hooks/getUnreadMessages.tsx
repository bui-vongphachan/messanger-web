import { AnyData, Message, User } from "@/types";
import { SubscriptionResult, useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";

export interface GetUnreadMessageQueryResponse {
  unreadConversation: {
    latestMessage: Message;
    user: User;
  };
}

export interface GetUnreadMessageVariables extends AnyData {
  userId: string;
}

export const GET_UNREAD_MESSAGES_QUERY_STRING = gql`
  subscription UnreadConversation($userId: ID) {
    unreadConversation(userId: $userId) {
      latestMessage {
        _id
        content
        senderId
        recipientId
        sentDate
        isRead
      }
      user {
        _id
        email
        name
        image
      }
    }
  }
`;

export const GetUnreadMessage = (
  variables: GetUnreadMessageVariables,
  callback?: (data?: GetUnreadMessageQueryResponse) => any
): SubscriptionResult<GetUnreadMessageQueryResponse, any> => {
  return useSubscription(GET_UNREAD_MESSAGES_QUERY_STRING, {
    variables,
    onData: (data) => {
      if (callback) callback(data.data.data);
    },
  });
};
