import { Message, User } from "@/types";
import { removeUnreadIndecator } from "@/utils";
import Image from "next/image";
import { Fragment, useCallback } from "react";
import { AllProps } from "../page";
import UserListLoading from "./loading";

const listId = "user-list";

const UserList = (props: AllProps) => {
  return (
    <div className=" flex flex-col overflow-x-hidden">
      <h1 className=" text-lg font-semibold py-4 px-6">Users</h1>
      <ul
        id={listId}
        className=" flex-1 overflow-x-hidden overflow-y-auto w-full divide-y-[0px]"
      >
        <Content {...props} />
      </ul>
    </div>
  );
};

const Content = (props: AllProps) => {
  const { user, setSelectedUser, getUsersQueryResult, selectedUser } = props;

  const handleClick = useCallback(
    (item: { user: User; latestMessage: Message | null }, index: number) => {
      setSelectedUser(item);

      if (!getUsersQueryResult) return;

      if (!item.latestMessage) return;

      if (item.latestMessage.isRead) return;

      removeUnreadIndecator(getUsersQueryResult, index);
    },
    [getUsersQueryResult, setSelectedUser]
  );

  if (!getUsersQueryResult || getUsersQueryResult.loading)
    return <UserListLoading />;

  if (!getUsersQueryResult.data || !!getUsersQueryResult.error) return null;

  return (
    <Fragment>
      {getUsersQueryResult.data.getUsers.map((item, index) => {
        const { latestMessage } = item;
        return (
          /* Conversation Item */
          <li
            key={index}
            className={
              (item.user._id === selectedUser?.user._id
                ? " bg-gray-200"
                : " hover:bg-gray-100") +
              " mx-4 relative p-4 group cursor-pointer transition-colors rounded-lg"
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
                  <h5 className=" text-gray-900 group-hover:text-gray-950 font-medium w-[100%] text-sm text-ellipsis overflow-hidden whitespace-nowrap">
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
                    <p className="text-gray-500 group-hover:text-gray-700  text-xs text-ellipsis overflow-hidden whitespace-nowrap">
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
