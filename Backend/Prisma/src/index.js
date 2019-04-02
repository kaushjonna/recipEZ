const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Creation = require('./resolvers/Creation')
const Subscription = require('./resolvers/Subscription')
const Comment = require('./resolvers/Comment')
const Ingredient_Type = require('./resolvers/Ingredient_Type')
const Ingredient = require('./resolvers/Ingredient')
const Saved_Recipe = require('./resolvers/Saved_Recipe')
const User = require('./resolvers/User')



const resolvers = {
  Query,
  Mutation,
  Subscription,
  Comment,
  Creation,
  Ingredient,
  Ingredient_Type,
  Saved_Recipe,
  User,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(() => console.log(`Server running on http://localhost:4000`))

