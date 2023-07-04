import { AnyData, Message } from "@/types";
import { SubscribeToMoreOptions, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface QueryResponse {
  getMessages: Message[];
}

interface Variables extends AnyData {
  userId: string;
  partnerId: string;
}

interface SubscriptionVariables extends AnyData {
  userId: string;
}

export const useGetMessages = (props: Variables) => {
  return useQuery<QueryResponse, Variables>(useGetHomeQueryString, {
    variables: props,
  });
};

const useGetHomeQueryString = gql`
  query GetMessages($userId: ID, $partnerId: ID) {
    getMessages(userId: $userId, partnerId: $partnerId) {
      _id
      content
      senderId
      recipientId
    }
  }
`;

const subscriptionString = gql`
  subscription Subscription($userId: ID) {
    newMessageSubscriber(userId: $userId) {
      _id
      content
      senderId
      recipientId
    }
  }
`;

export const getNewMessageSubscribeOptions = (
  props: SubscriptionVariables
): SubscribeToMoreOptions<
  QueryResponse,
  SubscriptionVariables,
  { newMessageSubscriber: Message }
> => {
  return {
    document: subscriptionString,
    variables: props,
    updateQuery: (prev, { subscriptionData }) => {
      const newDataSet = [...prev.getMessages];

      const newItem = subscriptionData.data.newMessageSubscriber;
      console.log(newItem);
      if (newItem) newDataSet.push(newItem);

      return {
        getMessages: newDataSet,
      };
    },
  };
};
