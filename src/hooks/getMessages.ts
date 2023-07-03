import { AnyData } from "@/types";
import { QueryResult, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface GetMessagesQueryResponse {}

interface Variables extends AnyData {}

export const useGetHomeQuery = (): [
  QueryResult<GetMessagesQueryResponse, Variables>,
  () => void
] => {
  const Result = useQuery<GetMessagesQueryResponse, Variables>(
    useGetHomeQueryString
  );

  const more = () => {
    if (Result.called && Result.data && !Result.loading && !Result.error) {
      Result.subscribeToMore<GetMessagesQueryResponse>({
        document: subscriptionString,
        updateQuery: (prev, { subscriptionData }) => {
          return {
            ...prev,
          };
        },
      });
    }
  };

  if (Result.error) {
  }

  if (Result.data) {
  }

  return [Result, more];
};

const useGetHomeQueryString = gql`
  query HomePageQuery {
    getMyFacebookProfile {
      _id
      name
      picture
    }
    getFacebookProfiles {
      _id
      name
      picture
      status
      last_seen
    }
  }
`;

const subscriptionString = gql`
  subscription GetMoreUserPresences {
    getMoreUserPresences {
      status
      user_id
      user_name
      last_seen
    }
  }
`;
