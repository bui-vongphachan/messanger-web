import { AnyData, Message } from "@/types";
import { SubscribeToMoreOptions, useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface QueryResponse {
  getMessages: Message[];
}

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
      senderId
    }
  }
`;

const subscriptionString = gql`
  subscription NewMessageSubscriber($conversationId: ID) {
    newMessageSubscriber(conversationId: $conversationId) {
      _id
      conversationId
      content
      senderId
    }
  }
`;

export const newMessageSubscribeOptions: SubscribeToMoreOptions<
  QueryResponse,
  Variables,
  { newMessageSubscriber: Message }
> = {
  document: subscriptionString,
  updateQuery: (prev, { subscriptionData }) => {
    const newDataSet = [...prev.getMessages];

    const newItem = subscriptionData.data.newMessageSubscriber;

    if (newItem) newDataSet.push(newItem);

    return {
      getMessages: newDataSet,
    };
  },
};
