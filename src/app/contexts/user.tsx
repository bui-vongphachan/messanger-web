import { AuthenticationGateContext } from "@/components/authenticationGate";
import {
  GetUnreadMessage,
  GetUsersQueryResponse,
  useGetUsersQuery,
} from "@/hooks";
import { User } from "@/types";
import { QueryResult } from "@apollo/client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const UserContext = createContext<{
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  getUserQueryResult: QueryResult<GetUsersQueryResponse> | null;
}>({
  selectedUser: null,
  setSelectedUser: () => {},
  getUserQueryResult: null,
});

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const { user } = useContext(AuthenticationGateContext);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUserQueryResult = useGetUsersQuery({
    userId: user ? user._id : "",
  });

  return (
    <UserContext.Provider
      value={{ selectedUser, setSelectedUser, getUserQueryResult }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
