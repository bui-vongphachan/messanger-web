"use client";

import { AnyData } from "@/types";
import {
  ApolloCache,
  DefaultContext,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import { gql } from "@apollo/client";

interface QueryResponse {}

interface Variables extends AnyData {
  senderId: string;
  recipientId: string;
  content: string;
  conversationId: string | null;
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
  mutation SendMessage(
    $senderId: ID
    $recipientId: ID
    $content: String
    $conversationId: ID
  ) {
    sendMessage(
      senderId: $senderId
      recipientId: $recipientId
      content: $content
      conversationId: $conversationId
    )
  }
`;
