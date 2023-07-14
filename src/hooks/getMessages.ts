import { AnyData, Message } from "@/types";
import { SubscribeToMoreOptions, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export interface GetMessageQueryResponse {
  getMessages: Message[];
}

export interface GetMessageVariables extends AnyData {
  userId: string;
  partnerId: string;
}

export const useGetMessages = (props: GetMessageVariables) => {
  return useQuery<GetMessageQueryResponse, GetMessageVariables>(
    GET_MESSAGE_QUERY_STRING,
    {
      variables: props,
    }
  );
};

export const GET_MESSAGE_QUERY_STRING = gql`
  query GetMessages($userId: ID, $partnerId: ID) {
    getMessages(userId: $userId, partnerId: $partnerId) {
      _id
      content
      senderId
      recipientId
      sentDate
    }
  }
`;

const subscriptionString = gql`
  subscription Subscription($userId: ID, $partnerId: ID) {
    newMessageSubscriber(userId: $userId, partnerId: $partnerId) {
      _id
      content
      senderId
      recipientId
      sentDate
    }
  }
`;

export const getNewMessageSubscribeOptions = (
  props: GetMessageVariables
): SubscribeToMoreOptions<
  GetMessageQueryResponse,
  GetMessageVariables,
  { newMessageSubscriber: Message }
> => {
  return {
    document: subscriptionString,
    variables: props,
    updateQuery: (prev, { subscriptionData }) => {
      const newDataSet = [...prev.getMessages];

      const newItem = subscriptionData.data.newMessageSubscriber;

      if (newItem) newDataSet.push(newItem);

      return {
        getMessages: newDataSet,
      };
    },
  };
};
