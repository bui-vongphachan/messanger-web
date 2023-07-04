"use client";

import { AnyData, Message } from "@/types";
import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import { gql } from "@apollo/client";

interface QueryResponse {
  sendMessage: Message;
}

interface Variables extends AnyData {
  senderId: string;
  recipientId: string;
  content: string;
}

export const SendMessageQuery = (
  props: Variables
): MutationTuple<
  QueryResponse,
  Variables,
  DefaultContext,
  ApolloCache<any>
> => {
  return useMutation<QueryResponse, Variables>(queryString, {
    variables: props,
  });
};

const queryString = gql`
  mutation SendMessage($senderId: ID, $recipientId: ID, $content: String) {
    sendMessage(
      senderId: $senderId
      recipientId: $recipientId
      content: $content
    ) {
      _id
      content
      senderId
      recipientId
    }
  }
`;
