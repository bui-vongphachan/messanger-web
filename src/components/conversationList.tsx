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

const ConversationList = () => {
  return (
    <ul className=" w-full overflow-x-hidden overflow-y-auto">
      {conversations.map((conversation, index) => {
        return <li key={index}>{conversation.last_message}</li>;
      })}
    </ul>
  );
};

export default ConversationList;
