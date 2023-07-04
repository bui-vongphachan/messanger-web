import { User } from "@/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const UserContext = createContext<{
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
}>({
  selectedUser: null,
  setSelectedUser: () => {},
});

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
