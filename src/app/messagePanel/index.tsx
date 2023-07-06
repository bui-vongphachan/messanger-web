import { removeUnreadIndecator } from "@/utils";
import { Player } from "@lottiefiles/react-lottie-player";
import { useCallback, useContext } from "react";
import { UserContext } from "../contexts";
import Footer from "./footer";
import MessageList from "./messageList";
import ChatAnimation from "./30464-coda-chaters.json";

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
      <section className="flex flex-col flex-1 justify-center items-center bg-gray-100">
        <div className=" w-96">
          <Player autoplay loop src={ChatAnimation} />
        </div>
        <h1 className=" text-lg font-semibold">Break the ice, say hello!</h1>
      </section>
    );
  }

  return (
    <section
      className="flex flex-col flex-1 bg-gray-100"
      onClick={readMessages}
    >
      <MessageList />
      <Footer />
    </section>
  );
};

export default MessagePanel;
