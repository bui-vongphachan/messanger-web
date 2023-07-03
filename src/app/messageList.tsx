import { messages } from "./data";
import AutoScroll from "@brianmcallister/react-auto-scroll";

const MessageList = () => {
  return (
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
  );
};

export default MessageList;
