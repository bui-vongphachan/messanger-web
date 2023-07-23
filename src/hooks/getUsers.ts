import { AnyData, Message, User } from "@/types";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export interface GetUsersQueryResponse {
  getUsers: {
    user: User;
    latestMessage: Message | null;
  }[];
}

export interface GetUserVariables extends AnyData {
  userId?: string;
}

export const useGetUsersQuery = (props: GetUserVariables) => {
  return useQuery<GetUsersQueryResponse, GetUserVariables>(
    GET_USERS_QUERY_STRING,
    {
      variables: props,
    }
  );
};

export const GET_USERS_QUERY_STRING = gql`
  query GetUsers($userId: String) {
    getUsers(userId: $userId) {
      latestMessage {
        _id
        content
        senderId
        recipientId
        isRead
        sentDate
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
