import React from "react";

import readedMessageIcon from "../../assets/icons/readed-message.svg";
import sendedMessageIcon from "../../assets/icons/sended-message.svg";

import {
  Container,
  CurrentConversationDate,
  MessagesList,
  MessageIn,
  MessageOut,
} from "./styles";

interface ConversationMessagesProps {
  messages: {
    id: number;
    message_type: string;
    message_content: string;
    message_time: string;
    readed_message: boolean;
  }[];
}

const ConversationMessages: React.FC<ConversationMessagesProps> = ({
  messages,
}) => {
  return (
    <Container>
      <CurrentConversationDate>
        <span>HOJE</span>
      </CurrentConversationDate>

      <MessagesList showOption={false}>
        {messages
          .concat(messages)
          .concat(messages)
          .concat(messages)
          .concat(messages)
          .concat(messages)
          .concat(messages)
          .map((message) => {
            const Message =
              message.message_type === "in" ? MessageIn : MessageOut;

            return (
              <Message key={String(message.id)}>
                <span>{message.message_content}</span>

                <small>
                  {message.message_time}

                  {message.message_type === "out" && message.readed_message && (
                    <img src={readedMessageIcon} alt="Confirmação de Leitura" />
                  )}

                  {message.message_type === "out" &&
                    !message.readed_message && (
                      <img src={sendedMessageIcon} alt="Confirmação de Envio" />
                    )}
                </small>
              </Message>
            );
          })}
      </MessagesList>
    </Container>
  );
};

export default ConversationMessages;
