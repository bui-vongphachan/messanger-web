import { AuthenticationGateContext } from "@/components/authenticationGate";
import { GetUsersQueryResponse, useGetUsersQuery } from "@/hooks";
import { Chat } from "@/types";
import { QueryResult } from "@apollo/client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const UserContext = createContext<{
  selectedUser: Chat | null;
  selectedUserIndex: number | null;
  setSelectedUserIndex: Dispatch<SetStateAction<number | null>>;
  setSelectedUser: Dispatch<SetStateAction<Chat | null>>;
  getUserQueryResult: QueryResult<GetUsersQueryResponse> | null;
}>({
  selectedUser: null,
  setSelectedUser: () => {},
  getUserQueryResult: null,
  selectedUserIndex: null,
  setSelectedUserIndex: () => {},
});

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const { user } = useContext(AuthenticationGateContext);

  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );

  const [selectedUser, setSelectedUser] = useState<Chat | null>(null);

  const getUserQueryResult = useGetUsersQuery({
    userId: user ? user._id : "",
  });

  return (
    <UserContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        getUserQueryResult,
        selectedUserIndex,
        setSelectedUserIndex,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
