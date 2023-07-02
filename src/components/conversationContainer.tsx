const ConversationContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className=" bg-blue-200 flex flex-1 overflow-hidden">
      {props.children}
    </div>
  );
};

export default ConversationContainer;
