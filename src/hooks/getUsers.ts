import { AnyData, Message, User } from "@/types";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export interface GetUsersQueryResponse {
  getUsers: {
    user: User;
    latestMessage: Message | null;
  }[];
}

interface Variables extends AnyData {
  userId?: string;
}

export const useGetUsersQuery = (props: Variables) => {
  return useQuery<GetUsersQueryResponse, Variables>(queryString, {
    variables: props,
  });
};

const queryString = gql`
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
