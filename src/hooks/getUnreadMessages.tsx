import { AnyData, Message, User } from "@/types";
import {
  QueryResult,
  SubscriptionResult,
  useSubscription,
} from "@apollo/client";
import { gql } from "@apollo/client";
import { GetUsersQueryResponse } from "./getUsers";

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
        previousMessageId
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
  getUserQueryResult: QueryResult<GetUsersQueryResponse>
): SubscriptionResult<GetUnreadMessageQueryResponse, any> => {
  return useSubscription(GET_UNREAD_MESSAGES_QUERY_STRING, {
    variables,
    onData: (data) => {
      const { updateQuery } = getUserQueryResult;

      if (!data.data.data) return;

      const unreadConversation = data.data.data.unreadConversation;

      updateQuery((prev) => {
        const index = prev.getUsers.findIndex(
          (item) => item.user._id === unreadConversation.user._id
        );

        if (index === -1) {
          return {
            getUsers: prev.getUsers.unshift(unreadConversation),
          };
        }

        const prevItem = prev.getUsers[index];

        const newItem = {
          ...prevItem,
          latestMessage: unreadConversation.latestMessage,
        };

        const newUsers = prev.getUsers.filter((_, _index) => _index !== index);

        newUsers.unshift(newItem);

        return {
          getUsers: newUsers as any,
        };
      });
    },
  });
};
