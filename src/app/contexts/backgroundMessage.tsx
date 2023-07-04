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

    readMessages();

    return () => {
      readMessagesResult.client.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser, readMessages]);

  return (
    <BackgroundMessageContext.Provider value={null}>
      {props.children}
    </BackgroundMessageContext.Provider>
  );
};

export default BackgroundMessageContextProvider;
