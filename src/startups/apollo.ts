import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  from,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "apollo-link-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});
/* 
const authLink = setContext(() => {
  return {
    headers: {},
  };
});

const wsLink = process.browser
  ? (new WebSocketLink({
      uri: "ws://localhost:4000/graphql",
      options: {
        reconnect: true,
        connectionParams: () => {
          return {};
        },
        connectionCallback: (error) => {},
      },
    }) as any)
  : null;

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink; */

export const graphqlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  credentials: "include",
});
