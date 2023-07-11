"use client";

import Navbar from "@/components/navbar";
import AuthenticationGate from "@/components/authenticationGate";
import { NextAuthProvider } from "@/components/sessionProvider";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "@/startups";
import UserList from "./userList";
import {
  BackgroundMessageContextProvider,
  MessageContextProvider,
  UserContextProvider,
} from "./contexts";
import MessagePanel from "./messagePanel";

export default function Home() {
  return (
    <NextAuthProvider>
      <AuthenticationGate>
        <ApolloProvider client={graphqlClient}>
          <UserContextProvider>
            <MessageContextProvider>
              <BackgroundMessageContextProvider>
                <main>
                  <Navbar />
                  {/* Main container */}
                  <div className="rounded-lg overflow-hidden shadow-md w-screen flex m-auto container h-[calc(100vh-96px)]">
                    {/* Conversation Panel */}
                    <aside className=" bg-white flex-1 w-fit max-w-[30%] min-w-[300px] flex flex-col">
                      {/* Conversation Container */}

                      <UserList />
                    </aside>
                    <MessagePanel />
                  </div>
                </main>
              </BackgroundMessageContextProvider>
            </MessageContextProvider>
          </UserContextProvider>
        </ApolloProvider>
      </AuthenticationGate>
    </NextAuthProvider>
  );
}
