import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from 'apollo-boost';

export const prismaClient = new ApolloClient({
  link: createHttpLink({
    uri: "https://eu1.prisma.sh/nik-malhotra-1a119d/recipez/dev",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});