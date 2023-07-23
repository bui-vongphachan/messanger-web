"use client";

import Navbar from "@/components/navbar";
import AuthenticationGate, {
  AuthenticationGateContext,
} from "@/components/authenticationGate";
import { NextAuthProvider } from "@/components/sessionProvider";
import {
  ApolloProvider,
  LazyQueryExecFunction,
  QueryResult,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { graphqlClient } from "@/startups";
import UserList from "./userList";
import MessagePanel from "./messagePanel";
import {
  GetMessageQueryResponse,
  GetMessageVariables,
  GetUsersQueryResponse,
  GET_MESSAGE_QUERY_STRING,
  GET_USERS_QUERY_STRING,
} from "@/hooks";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Chat, User } from "@/types";

export interface AllProps {
  user: User | null;
  selectedUser: Chat | null;
  getUsersQueryResult: QueryResult<GetUsersQueryResponse, any>;
  getMessagesQueryResult: QueryResult<
    GetMessageQueryResponse,
    GetMessageVariables
  >;
  setSelectedUser: Dispatch<SetStateAction<Chat | null>>;
  getMessages: LazyQueryExecFunction<
    GetMessageQueryResponse,
    GetMessageVariables
  >;
}

export default function Home() {
  return (
    <NextAuthProvider>
      <AuthenticationGate>
        <ApolloProvider client={graphqlClient}>
          <Main />
        </ApolloProvider>
      </AuthenticationGate>
    </NextAuthProvider>
  );
}

const Main = () => {
  const { user } = useContext(AuthenticationGateContext);

  const [selectedUser, setSelectedUser] = useState<Chat | null>(null);

  const getUsersQueryResult = useQuery<GetUsersQueryResponse, any>(
    GET_USERS_QUERY_STRING,
    {
      variables: {
        userId: user ? user._id : "",
      },
    }
  );

  const [getMessages, getMessagesQueryResult] = useLazyQuery<
    GetMessageQueryResponse,
    GetMessageVariables
  >(GET_MESSAGE_QUERY_STRING, {
    variables: { userId: user?._id!, partnerId: selectedUser?.user._id! },
  });

  useEffect(() => {
    if (!selectedUser) return;

    if (!user) return;

    if (getMessagesQueryResult?.called) return;

    getMessages();
  }, [selectedUser, user, getMessages, getMessagesQueryResult]);

  return (
    <main className="px-4 box-border">
      <Navbar />
      {/* Main container */}
      <div className="rounded-lg overflow-hidden shadow-md relative w-full flex m-auto container h-[calc(100vh-96px)]">
        {/* Conversation Panel */}
        <aside className=" bg-white flex-1 w-full md:w-fit md:max-w-[30%] md:min-w-[300px] flex flex-col">
          {/* Conversation Container */}

          <UserList
            user={user}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            getMessages={getMessages}
            getUsersQueryResult={getUsersQueryResult}
            getMessagesQueryResult={getMessagesQueryResult}
          />
        </aside>
        <MessagePanel
          user={user}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          getMessages={getMessages}
          getUsersQueryResult={getUsersQueryResult}
          getMessagesQueryResult={getMessagesQueryResult}
        />
      </div>
    </main>
  );
};
