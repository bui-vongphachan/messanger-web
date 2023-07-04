import { removeUnreadIndecator } from "@/utils";
import { useCallback, useContext } from "react";
import { UserContext } from "../contexts";
import Footer from "./footer";
import MessageList from "./messageList";

const MessagePanel = () => {
  const { selectedUser, getUserQueryResult, selectedUserIndex } =
    useContext(UserContext);

  const readMessages = useCallback(() => {
    if (!selectedUser) return;

    if (!getUserQueryResult) return;

    if (selectedUserIndex === null) return;

    removeUnreadIndecator(getUserQueryResult, selectedUserIndex);
  }, [selectedUser, getUserQueryResult, selectedUserIndex]);

  if (!selectedUser) {
    return (
      <section className="flex flex-col flex-1 justify-center items-center">
        <h1 className=" text-lg font-semibold">Select a user</h1>
      </section>
    );
  }

  return (
    <section
      className="flex flex-col flex-1 bg-blue-900 text-black"
      onClick={readMessages}
    >
      <MessageList />
      <Footer />
    </section>
  );
};

export default MessagePanel;
