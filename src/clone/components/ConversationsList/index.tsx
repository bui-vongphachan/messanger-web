import React from 'react';

import Image from "next/image";
import readedMessageIcon from '../../assets/icons/readed-message.svg';
import avatarIcon from '../../assets/icons/avatar.svg';
import mutedConversationIcon from '../../assets/icons/muted-conversation.svg';
import conversationMenuArrowIcon from '../../assets/icons/conversation-menu-arrow.svg';

import { 
  Container, 
  ConversationItem, 
  ConversationInfo, 
  ConversationButtons 
} from './styles';

interface ConversationsListProps {
  conversations: {
    id: number;
    name: string;
    last_message: string;
    last_message_data: string;
    muted_conversation: boolean;
  }[];
}

const ConversationsList: React.FC<ConversationsListProps> = ({ conversations }) => {
  return (
    <Container>
      <ul>
        {conversations.concat(conversations).map((conversation) => {
          return (
            <ConversationItem key={String(conversation.id)}>
              <Image src={avatarIcon} alt={conversation.name} />

              <ConversationInfo>
                <div>
                  <h5>{conversation.name}</h5>
                  <span>
                    <Image src={readedMessageIcon} alt="Mensagem Lida" />
                    {conversation.last_message}
                  </span>
                </div>
                
                <div>
                  <small>{conversation.last_message_data}</small>

                  <ConversationButtons>
                    {
                      conversation.muted_conversation 
                        && <Image src={mutedConversationIcon} alt="Conversa Silenciada" />
                    }

                    <button type="button" id="conversation-menu-button">
                      <Image src={conversationMenuArrowIcon} alt="Conversa Silenciada" />
                    </button>
                  </ConversationButtons>
                </div>
              </ConversationInfo>
            </ConversationItem>
          );
        })}
      </ul>
    </Container>
  );
}

export default ConversationsList;