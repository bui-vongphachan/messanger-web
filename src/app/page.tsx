"use client";

import Image from "next/image";
import { messages } from "./data";
import AutoScroll from "@brianmcallister/react-auto-scroll";
import Navbar from "@/components/navbar";
import { useContext, useState } from "react";
import microphoneIcon from "./send.svg";
import AuthenticationGate, {
  AuthenticationGateContext,
} from "@/components/authenticationGate";
import { NextAuthProvider } from "@/components/sessionProvider";
import { useGetUsersQuery } from "@/hooks";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "@/startups";
import { useSession } from "next-auth/react";

interface Conversation {
  name: string;
  last_message: string;
  last_message_data: string;
  muted_conversation: boolean;
}

const conversations: Conversation[] = new Array(100).fill({
  name: "Contato 1",
  last_message:
    "Lorem Ipsum is simply dummy text of the printing and typesetting",
  last_message_data: "23:59",
  muted_conversation: true,
});

export default function Home() {
  return (
    <NextAuthProvider>
      <AuthenticationGate>
        <ApolloProvider client={graphqlClient}>
          <MainContent />
        </ApolloProvider>
      </AuthenticationGate>
    </NextAuthProvider>
  );
}

const MainContent = () => {
  const { user } = useContext(AuthenticationGateContext);

  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const { result } = useGetUsersQuery({ userId: user ? user._id : "" });

  if (!result.data) return null;

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
            </section>
            {/* Conversation List */}
            <ul className=" w-full overflow-x-hidden overflow-y-auto divide-y-[0px] divide-blue-800">
              {result.data.getUsers.map((user, index) => {
                return (
                  /* Conversation Item */
                  <li
                    key={index}
                    className={
                      (index === selectedUser
                        ? " bg-blue-800 hover:bg-blue-700 text-white"
                        : " hover:bg-blue-900") +
                      " relative p-4 group cursor-pointer transition-colors"
                    }
                    onClick={() => setSelectedUser(index)}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={user.image}
                        className=" rounded-full"
                        width={"50"}
                        height={"50"}
                        alt=""
                      />
                      <div className="w-[calc(100%-66px)] relative flex flex-col">
                        <div className="flex justify-between items-center">
                          <h5 className=" text-sm font-normal text-ellipsis overflow-hidden whitespace-nowrap">
                            {user.name}
                          </h5>
                        </div>
                        <div className="flex">
                          <div className="flex flex-1 items-center gap-2 w-[calc(100%-20px)]">
                            <p className=" text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Rerum porro deleniti suscipit,
                              at nostrum doloremque aspernatur perferendis
                              praesentium repellendus id iste exercitationem
                              facilis debitis dolor dolorum impedit eveniet!
                              Libero, fugiat.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
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
          {/* Messages Container */}
          <section className="flex flex-col overflow-hidden flex-1">
            {/* Message List */}
            <AutoScroll
              showOption={false}
              className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-4"
            >
              {messages
                .concat(messages)
                .concat(messages)
                .concat(messages)
                .concat(messages)
                .map((message, index) => {
                  return (
                    <div
                      key={index}
                      data-value={message.message_type}
                      className="message"
                    >
                      <span className=" text-sm leading-3 pr-10">
                        {message.message_content}
                      </span>
                      <div className="flex gap-1 items-center absolute right-2 bottom-1">
                        <small className=" text-[10px] leading-3">
                          {message.message_time}
                        </small>
                      </div>
                    </div>
                  );
                })}
            </AutoScroll>
          </section>
          <footer className="flex gap-4 items-center mt-auto justify-between py-4 px-8 bg-blue-950">
            <div className=" rounded-3xl w-full overflow-hidden">
              <input className=" text-sm w-full h-12 px-4 outline-none" />
            </div>
            <button className=" bg-blue-800 hover:bg-blue-900 transition-colors px-2 rounded-full shrink-0 w-[48px] h-[48px] flex justify-center items-center">
              <Image
                src={microphoneIcon}
                width={24}
                height={24}
                className=" translate-x-[4px]"
                alt="Microfone"
              />
            </button>
          </footer>
        </section>
      </div>
    </main>
  );
};
