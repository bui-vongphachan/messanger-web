import { AuthenticationGateContext } from "@/components/authenticationGate";
import {
  useGetMessages,
  getNewMessageSubscribeOptions,
  GetMessageVariables,
  GetMessageQueryResponse,
} from "@/hooks";
import { createContext, useContext, useEffect } from "react";
import { UserContext } from "./user";
import { QueryResult } from "@apollo/client";

export const MessageContext = createContext<{
  queryResult: QueryResult<GetMessageQueryResponse, GetMessageVariables> | null;
}>({
  queryResult: null,
});

export const MessageContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const { user } = useContext(AuthenticationGateContext);

  const { selectedUser } = useContext(UserContext);

  const [getMessages, queryResult] = useGetMessages({
    userId: user?._id!,
    partnerId: selectedUser?.user._id!,
  });

  useEffect(() => {
    if (!queryResult.called) return;

    const unsubscriber = queryResult.subscribeToMore(
      getNewMessageSubscribeOptions({
        userId: user?._id!,
        partnerId: selectedUser?.user._id!,
      })
    );

    return () => {
      unsubscriber();
    };
  }, [queryResult, user, selectedUser]);

  useEffect(() => {
    if (!selectedUser) return;

    if (!user) return;

    if (queryResult?.called) return;

    getMessages();
  }, [selectedUser, user, getMessages, queryResult]);

  return (
    <MessageContext.Provider value={{ queryResult }}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
