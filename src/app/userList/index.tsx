import { AuthenticationGateContext } from "@/components/authenticationGate";
import { GetUnreadMessage } from "@/hooks";
import { Message, User } from "@/types";
import { removeUnreadIndecator } from "@/utils";
import Image from "next/image";
import { useContext, Fragment, useCallback } from "react";
import { UserContext } from "../contexts";
import UserListLoading from "./loading";

const UserList = () => {
  return (
    <ul className=" w-full overflow-x-hidden overflow-y-auto divide-y-[0px] divide-blue-800">
      <Content />
    </ul>
  );
};

const Content = () => {
  const { user } = useContext(AuthenticationGateContext);

  const {
    selectedUser,
    setSelectedUser,
    getUserQueryResult,
    setSelectedUserIndex,
  } = useContext(UserContext);

  GetUnreadMessage({ userId: user?._id! }, getUserQueryResult!);

  const handleClick = useCallback(
    (item: { user: User; latestMessage: Message | null }, index: number) => {
      setSelectedUser(item);

      setSelectedUserIndex(index);

      if (!getUserQueryResult) return;

      if (!item.latestMessage) return;

      if (item.latestMessage.isRead) return;

      /*  removeUnreadIndecator(getUserQueryResult, index); */
    },
    [getUserQueryResult, setSelectedUser, setSelectedUserIndex]
  );

  if (!getUserQueryResult || getUserQueryResult.loading)
    return <UserListLoading />;

  if (!getUserQueryResult.data || !!getUserQueryResult.error) return null;

  return (
    <Fragment>
      {getUserQueryResult.data.getUsers.map((item, index) => {
        const { latestMessage } = item;
        return (
          /* Conversation Item */
          <li
            key={index}
            className={
              (item.user._id === selectedUser?.user._id
                ? " bg-blue-800 hover:bg-blue-700 text-white"
                : " hover:bg-blue-900") +
              " relative p-4 group cursor-pointer transition-colors rounded-lg"
            }
            onClick={() => handleClick(item, index)}
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.user.image}
                className=" rounded-full"
                width={"50"}
                height={"50"}
                alt=""
              />
              <div className="w-[calc(100%-66px)] relative flex flex-col gap-2">
                <div className="flex justify-between items-center relativ pr-8">
                  <h5 className=" w-[100%] text-sm font-normal text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.user.name}
                  </h5>
                  <div
                    className="new-message-indicator"
                    style={{
                      display: (() => {
                        if (!latestMessage) return "none";

                        if (latestMessage.senderId === user?._id) return "none";

                        if (latestMessage.isRead) return "none";

                        return "flex";
                      })(),
                    }}
                  >
                    1
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-1 items-center gap-2 w-[calc(100%-20px)]">
                    <p className=" text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.latestMessage?.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </Fragment>
  );
};
export default UserList;
