"use client";

import Navbar from "@/components/navbar";
import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";
import AuthenticationGate, {
  AuthenticationGateContext,
} from "@/components/authenticationGate";
import { NextAuthProvider } from "@/components/sessionProvider";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "@/startups";
import Footer from "./footer";
import MessageList from "./messageList";
import { User } from "@/types";
import UserList from "./userList";

export const UserContext = createContext<{
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
}>({
  selectedUser: null,
  setSelectedUser: () => {},
});

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <NextAuthProvider>
      <AuthenticationGate>
        <ApolloProvider client={graphqlClient}>
          <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
            <MainContent />
          </UserContext.Provider>
        </ApolloProvider>
      </AuthenticationGate>
    </NextAuthProvider>
  );
}

const MainContent = () => {
  const { selectedUser } = useContext(UserContext);
  return (
    <main>
      <Navbar />
      {/* Main container */}
      <div className=" text-blue-200 bg-blue-950 rounded-lg overflow-hidden shadow-md w-screen flex m-auto md:w-[90%] md:h-[calc(100vh-96px)]">
        {/* Conversation Panel */}
        <aside className=" max-w-[30%] min-w-[300px] flex flex-col">
          {/* Conversation Container */}
          <div className=" flex flex-col flex-1 overflow-hidden">
            {/* Search Box */}
            <section className=" p-4">
              <h1 className=" text-lg font-semibold">Users</h1>
              <UserList />
            </section>
          </div>
        </aside>

        {/* Empty Panel */}
        <section
          className="flex flex-col flex-1 justify-center items-center"
          style={{ display: selectedUser ? "none" : "flex" }}
        >
          <h1 className=" text-lg font-semibold">Select a user</h1>
        </section>
        {/* Messages Panel */}
        <section
          className="flex flex-col flex-1 bg-blue-900 text-black"
          style={{ display: !selectedUser ? "none" : "flex" }}
        >
          <MessageList />
          <Footer />
        </section>
      </div>
    </main>
  );
};
