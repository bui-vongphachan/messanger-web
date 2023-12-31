import { AuthenticationGateContext } from "@/components/authenticationGate";
import { useReadUnreadMessages } from "@/hooks";
import { createContext, useContext, useEffect } from "react";
import { UserContext } from "./user";

export const BackgroundMessageContext = createContext(null);

export const BackgroundMessageContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const { user } = useContext(AuthenticationGateContext);

  const { selectedUser } = useContext(UserContext);

  const [readMessages, readMessagesResult] = useReadUnreadMessages({
    senderId: selectedUser?.user._id!,
    recipientId: user?._id!,
  });

  useEffect(() => {
    if (!user) return;

    if (!selectedUser) return;

    if (!selectedUser.latestMessage) return;

    if (selectedUser.latestMessage.isRead) return;

    if (selectedUser.latestMessage.senderId === user._id) return;

    readMessages();

    return () => {
      readMessagesResult.client.stop();
    };
  }, [selectedUser, readMessages, readMessagesResult, user]);

  return (
    <BackgroundMessageContext.Provider value={null}>
      {props.children}
    </BackgroundMessageContext.Provider>
  );
};

export default BackgroundMessageContextProvider;
