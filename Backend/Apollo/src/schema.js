const { gql } = require('apollo-server');

const typeDefs = gql `
  type Query {
    recipes: Recipe
  }
  
  type Recipe {
    id: String!
    name: String!
    yield: String
    ingredients: [String]
    url: string
  }
`;

module.exports(typeDefs);