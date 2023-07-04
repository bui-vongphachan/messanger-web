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
                  <div className=" text-blue-200 bg-blue-950 rounded-lg overflow-hidden shadow-md w-screen flex m-auto md:w-[90%] md:h-[calc(100vh-96px)]">
                    {/* Conversation Panel */}
                    <aside className=" max-w-[30%] min-w-[300px] flex flex-col">
                      {/* Conversation Container */}
                      <div className=" flex flex-col flex-1 overflow-hidden">
                        {/* Search Box */}
                        <section className=" p-4 flex flex-col gap-2">
                          <h1 className=" text-lg font-semibold">Users</h1>
                          <UserList />
                        </section>
                      </div>
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
