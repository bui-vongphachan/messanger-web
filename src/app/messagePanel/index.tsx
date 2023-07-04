import { useContext } from "react";
import { UserContext } from "../context";
import Footer from "./footer";
import MessageContextProvider from "./context";
import MessageList from "./messageList";

const MessagePanel = () => {
  const { selectedUser } = useContext(UserContext);

  if (!selectedUser) {
    return (
      <section className="flex flex-col flex-1 justify-center items-center">
        <h1 className=" text-lg font-semibold">Select a user</h1>
      </section>
    );
  }
  return (
    <MessageContextProvider>
      <section className="flex flex-col flex-1 bg-blue-900 text-black">
        <MessageList />
        <Footer />
      </section>
    </MessageContextProvider>
  );
};

export default MessagePanel;
