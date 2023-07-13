import { removeUnreadIndecator } from "@/utils";
import { Player } from "@lottiefiles/react-lottie-player";
import { useCallback, useContext } from "react";
import { UserContext } from "../contexts";
import Footer from "./footer";
import MessageList from "./messageList";
import ChatAnimation from "./30464-coda-chaters.json";
import classes from "classnames";

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
      <section className=" hidden sm:block flex-1 bg-gray-100">
        <div className=" flex flex-col justify-center items-center h-full">
          <div className=" w-96">
            <Player autoplay loop src={ChatAnimation} />
          </div>
          <h1 className=" text-lg font-semibold">Break the ice, say hello!</h1>
        </div>
      </section>
    );
  }

  return (
    <section
      // className=" hidden md:flex flex-col flex-1 bg-gray-100"
      // className=" "
      className={classes(
        `absolute w-full h-full md:relative md:flex flex-col flex-1 bg-gray-100`,
        {
          hidden: !selectedUser,
        }
      )}
      onClick={readMessages}
    >
      <MessageList />
      <Footer />
    </section>
  );
};

export default MessagePanel;
