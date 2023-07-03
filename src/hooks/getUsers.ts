import { AnyData, Conversation, User } from "@/types";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export interface GetUsersQueryResponse {
  getUsers: {
    user: User;
    conversation: Conversation | null;
  }[];
}

interface Variables extends AnyData {
  userId?: string;
}

export const useGetUsersQuery = (props: Variables) => {
  return useQuery<GetUsersQueryResponse, Variables>(useGetUsersQueryString, {
    variables: props,
  });
};

export const useGetUsersQueryString = gql`
  query GetUsers($userId: String) {
    getUsers(userId: $userId) {
      conversation {
        senderId
        recipientId
        lastMessage
        _id
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
