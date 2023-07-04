"use client";

import { AnyData } from "@/types";
import { gql, useMutation } from "@apollo/client";

export interface ReadMessageQueryResponse {
  readMessages: boolean;
}

export interface ReadMessageVariables extends AnyData {
  senderId: string;
  recipientId: string;
}

export const useReadUnreadMessages = (props: ReadMessageVariables) => {
  return useMutation<ReadMessageQueryResponse, ReadMessageVariables>(
    READ_MESSAGE_QUERY_STRING,
    { variables: props }
  );
};

export const READ_MESSAGE_QUERY_STRING = gql`
  mutation ReadMessages($senderId: ID, $recipientId: ID) {
    readMessages(senderId: $senderId, recipientId: $recipientId)
  }
`;
