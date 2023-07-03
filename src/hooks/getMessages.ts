import { AnyData } from "@/types";
import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface QueryResponse {}

interface Variables extends AnyData {
  conversationId: string;
}

export const useGetMessages = (props: Variables) => {
  return useLazyQuery<QueryResponse, Variables>(useGetHomeQueryString, {
    variables: props,
  });
};

const useGetHomeQueryString = gql`
  query GetMessages($conversationId: ID) {
    getMessages(conversationId: $conversationId) {
      _id
      content
      conversationId
    }
  }
`;
