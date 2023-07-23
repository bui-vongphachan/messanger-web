import { Player } from "@lottiefiles/react-lottie-player";
import Footer from "./footer";
import MessageList from "./messageList";
import ChatAnimation from "./30464-coda-chaters.json";
import classes from "classnames";
import { AllProps } from "../page";

const MessagePanel = (props: AllProps) => {
  const { selectedUser } = props;

  if (!selectedUser) {
    return (
      <section className=" hidden md:block flex-1 bg-gray-100">
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
      className={classes(
        `absolute w-full h-full md:relative flex flex-col flex-1 bg-gray-200`,
        {
          hidden: !selectedUser,
        }
      )}
    >
      <MessageList {...props} />
      <Footer {...props} />
    </section>
  );
};

export default MessagePanel;
