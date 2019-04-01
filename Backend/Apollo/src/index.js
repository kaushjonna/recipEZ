const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const RecipeAPI = require('./datasources/yummly');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    recipeAPI: new RecipeAPI()
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 ready for liftoff at ${url}`);
});