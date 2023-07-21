import { GetMessageQueryResponse, GetMessageVariables } from "@/hooks";
import { Message } from "@/types";
import { QueryResult } from "@apollo/client";

export const addNewMessageToConversation = (props: {
  queryResult: QueryResult<GetMessageQueryResponse, GetMessageVariables> | null;
  message: Message | null;
}) => {
  props.queryResult?.updateQuery((prev) => {
    if (!props.message) return prev;

    let newMessagesList = [...prev.getMessages.messages];

    newMessagesList.unshift(props.message);

    return {
      getMessages: {
        isEndOfConversation: prev.getMessages.isEndOfConversation,
        messages: newMessagesList,
      },
    };
  });
};
