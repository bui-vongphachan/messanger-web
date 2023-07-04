import { AuthenticationGateContext } from "@/components/authenticationGate";
import {
  useGetMessages,
  getNewMessageSubscribeOptions,
  GetMessageVariables,
  GetMessageQueryResponse,
} from "@/hooks";
import { createContext, useContext, useEffect } from "react";
import { UserContext } from "../context";
import { QueryResult } from "@apollo/client";

export const MessageContext = createContext<{
  queryResult: QueryResult<GetMessageQueryResponse, GetMessageVariables> | null;
}>({
  queryResult: null,
});

const MessageContextProvider = (props: { children: React.ReactNode }) => {
  const { user } = useContext(AuthenticationGateContext);

  const { selectedUser } = useContext(UserContext);

  const queryResult = useGetMessages({
    userId: user?._id!,
    partnerId: selectedUser?._id!,
  });

  useEffect(() => {
    if (!queryResult.called) return;

    const unsubscriber = queryResult.subscribeToMore(
      getNewMessageSubscribeOptions({
        userId: user?._id!,
      })
    );

    return () => {
      unsubscriber();
    };
  }, [queryResult, user]);

  return (
    <MessageContext.Provider value={{ queryResult }}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
