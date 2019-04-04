const { gql } = require('apollo-server');

const typeDefs = gql `
  type Query {
    recipes: [Recipe]
    getRecipesByIngredients(ingredients: [String]): [Recipe]
  }
  
  type Recipe {
    id: String
    totalTime: Int
    name: String
    ingredients: [String]
    rating: Int
  }
  

`;

module.exports = typeDefs;