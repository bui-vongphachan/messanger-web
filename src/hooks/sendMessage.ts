"use client";

import { AnyData, Message } from "@/types";
import { gql } from "@apollo/client";

export interface SendMessageQueryResponse {
  sendMessage: Message;
}

export interface SendMessageVariables extends AnyData {
  senderId: string;
  recipientId: string;
  content: string;
}

export const SEND_MESSAGE_QUERY_STRING = gql`
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
