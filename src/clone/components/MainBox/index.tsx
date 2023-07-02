import React, { useState } from 'react';

import ConversationsList from '../ConversationsList';
import ConversationMessages from '../ConversationMessages';

import contactsConversations from '../../data/contacts-conversations.json';
import conversationMessages from '../../data/conversation-messages.json';
import statusIcon from '../../assets/icons/status.svg';
import conversationIcon from '../../assets/icons/conversation.svg';
import menuIcon from '../../assets/icons/menu.svg';
import alertIcon from '../../assets/icons/alert.svg';
import conversationSearchIcon from '../../assets/icons/conversation-search.svg';
import attachmentsIcon from '../../assets/icons/attachments.svg';
import emoticonsIcon from '../../assets/icons/emoticons.svg';
import microphoneIcon from '../../assets/icons/microphone.svg';
import avatarIcon from '../../assets/icons/avatar.svg';

import { 
  Container, 
  Header, 
  Sidebar, 
  AlertBox, 
  SearchContacts, 
  Conversation ,
  Footer,
} from './styles';

const MainBox = () => {
  const [messages, setMessages] = useState(conversationMessages);
  const [newMessage, setNewMessage] = useState('');

  function handleSendNewMessage(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === 13) {
      const currentDate = new Date();

      setMessages([
        ...messages,
        {
          id: messages[messages.length - 1].id + 1,
          message_type: 'out',
          message_content: newMessage,
          message_time: `${currentDate.getHours().toString().padStart(2, '0')}
                        :${currentDate.getMinutes().toString().padStart(2, '0')}`,
          readed_message: false
        }
      ]);

      setNewMessage('');
    }
  }
  
  return (
    <Container>
      <Sidebar>
        <Header>
          <img src={avatarIcon} alt="Avatar" />

          <div className="buttons">
            <button type="button">
              <img src={statusIcon} alt="Status" />
            </button>

            <button type="button">
              <img src={conversationIcon} alt="Conversas" />
            </button>

            <button type="button">
              <img src={menuIcon} alt="Menu" />
            </button>
          </div>
        </Header>

        <AlertBox>
          <img src={alertIcon} alt="Alert" />

          <div>
            <span>Receba notificações de novas mensagens</span>
            <a href="https://localhost:3000">Ativar notificações na área de trabalho</a>
          </div>
        </AlertBox>

        <SearchContacts>
          <input 
            type="text" 
            id="search-contacts"
            placeholder="Procurar ou começar uma nova conversa"
          />
        </SearchContacts>

        <ConversationsList conversations={contactsConversations} />
      </Sidebar>

      <Conversation>
        <Header>
          <img src={avatarIcon} alt="Avatar" />

          <h4>
            Lucas Fernando Iori
            <span>online</span>
          </h4>

          <div className="buttons">
            <button type="button">
              <img src={conversationSearchIcon} alt="Pesquisa" />
            </button>

            <button type="button">
              <img src={attachmentsIcon} alt="Anexos" />
            </button>

            <button type="button">
              <img src={menuIcon} alt="Menu" />
            </button>
          </div>
        </Header>

        <ConversationMessages messages={messages} />

        <Footer>
          <button type="button">
            <img src={emoticonsIcon} alt="Emoticons" />
          </button>

          <input 
            type="text" 
            placeholder="Digite uma mensagem"
            value={newMessage}
            onChange={(e) => { setNewMessage(e.target.value) }}
            onKeyPress={handleSendNewMessage}
          />

          <button type="button">
            <img src={microphoneIcon} alt="Microfone" />
          </button>
        </Footer>
      </Conversation>
    </Container>
  );
}

export default MainBox;