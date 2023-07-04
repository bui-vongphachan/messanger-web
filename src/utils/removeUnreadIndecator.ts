import { GetUsersQueryResponse } from "@/hooks";
import { QueryResult } from "@apollo/client";

export const removeUnreadIndecator = (
  getUserQueryResult: QueryResult<GetUsersQueryResponse>,
  userListIndex: number
) => {
  const { updateQuery } = getUserQueryResult;

  updateQuery((prev) => {
    let newSet = [...prev.getUsers];

    let { latestMessage, user } = newSet[userListIndex];

    if (latestMessage === null) return prev;

    newSet[userListIndex] = {
      user,
      latestMessage: { ...latestMessage, isRead: true },
    };

    return {
      getUsers: newSet,
    };
  });
};
