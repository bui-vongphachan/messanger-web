"use client";

import Image from "next/image";
import readedMessageIcon from "../clone/assets/icons/readed-message.svg";
import microphoneIcon from "../clone/assets/icons/send.svg";
import conversationMenuArrowIcon from "../clone/assets/icons/conversation-menu-arrow.svg";
import { messages } from "./data";

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
  const lorem = (
    <span className=" whitespace-nowrap text-ellipsis">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam quae
      dolore veritatis eos minima iusto voluptates nemo numquam dolorem quo
      dolores, molestiae animi, magni culpa iste voluptas quia consectetur ex.
    </span>
  );
  return (
    /* Main container */
    <div className=" w-screen flex m-auto md:w-[90%] md:h-screen bg-blue-50">
      {/* Conversation Panel */}
      <aside className=" max-w-[30%] min-w-[300px] flex flex-column bg-blue-100">
        {/* Conversation Container */}
        <div className=" bg-blue-200 flex flex-1 overflow-hidden">
          {/* Conversation List */}
          <ul className=" w-full overflow-x-hidden overflow-y-auto divide-y-2 divide-blue-300">
            {conversations.map((conversation, index) => {
              return (
                /* Conversation Item */
                <li key={index} className=" relative py-2 px-4">
                  <div className="flex gap-4">
                    <Image
                      src={`https://picsum.photos/${100 + index}`}
                      className=" rounded-full"
                      width={"50"}
                      height={"50"}
                      alt=""
                    />
                    <div className="w-[calc(100%-66px)] relative flex flex-col">
                      <div className="flex justify-between">
                        <h5 className=" text-base font-normal mb-1 text-ellipsis overflow-hidden whitespace-nowrap">
                          {conversation.name}
                        </h5>
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                          {conversation.last_message_data}
                        </span>
                      </div>
                      <div className="flex">
                        <div className="flex flex-1 gap-2 w-[calc(100%-20px)]">
                          <Image src={readedMessageIcon} alt="Mensagem Lida" />
                          <p className=" text-ellipsis overflow-hidden whitespace-nowrap">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Rerum porro deleniti suscipit, at nostrum
                            doloremque aspernatur perferendis praesentium
                            repellendus id iste exercitationem facilis debitis
                            dolor dolorum impedit eveniet! Libero, fugiat.
                          </p>
                        </div>
                        <button className=" relative w-[20px] h-[20px]">
                          <Image
                            width={20}
                            height={20}
                            src={conversationMenuArrowIcon}
                            alt="Conversa Silenciada"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Messages Panel */}
      <section className="flex flex-col flex-1">
        {/* Messages Container */}
        <section className="flex flex-col overflow-hidden flex-1">
          {/* Message List */}
          <ul className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-4 px-16">
            {messages
              .concat(messages)
              .concat(messages)
              .concat(messages)
              .concat(messages)
              .map((message, index) => {
                const isMessageIn = message.message_type === "in";

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
                      <div className="h-[16px] w-[16px] hidden">
                        <Image
                          src={readedMessageIcon}
                          alt="Confirmação de Leitura"
                          width={14}
                          height={14}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </ul>
        </section>
        <footer className="flex items-center mt-auto justify-between py-4 px-2 bg-emerald-100">
          <input className=" text-sm w-full h-12 py-1 mx-3 rounded-3xl" />
          <button className=" hover:bg-gray-300 transition-colors px-2 rounded-full shrink-0 w-[48px] h-[48px] flex justify-center items-center">
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
  );
}
