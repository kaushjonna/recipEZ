const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const RecipeAPI = require('./datasources/yummly');
const PrismaAPI = require('./datasources/prisma');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    recipeAPI: new RecipeAPI(),
    prismaAPI: new PrismaAPI,
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 ready for liftoff at ${url}`);
});