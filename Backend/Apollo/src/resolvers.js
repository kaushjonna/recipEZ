module.exports = {
  Query: {
    recipes: async (_, __, { dataSources }) =>
      dataSources.recipeAPI.getAllRecipes(),
    getRecipesByIngredients: async (_, { ingredients }, { dataSources }) =>
      dataSources.recipeAPI.getRecipeByIngredientList( { ingredients } ),
  }
};