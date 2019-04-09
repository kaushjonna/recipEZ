const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    recipes: [Recipe]
    getRecipesByIngredients(ingredients: [String]): [Recipe]
    getRecipeById(id: String): Recipe
    getRecipeBySearch(query: String): [Recipe]
  }
  
  type Recipe {
    id: String
    totalTime: Int
    image: String
    name: String
    ingredients: [String]
    rating: Int
  }
  

`;

module.exports = typeDefs;