import { AnyData, User } from "@/types";
import { QueryResult, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export interface GetUsersQueryResponse {
  getUsers: User[];
}

interface Variables extends AnyData {
  userId?: string;
}

export const useGetUsersQuery = (
  props: Variables
): {
  result: QueryResult<GetUsersQueryResponse, Variables>;
} => {
  const Result = useQuery<GetUsersQueryResponse, Variables>(
    useGetUsersQueryString,
    { variables: props }
  );

  if (Result.error) {
  }

  if (Result.data) {
  }

  return { result: Result };
};

export const useGetUsersQueryString = gql`
  query GetUsers($userId: String) {
    getUsers(userId: $userId) {
      _id
      email
      image
      name
    }
  }
`;
