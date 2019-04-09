module.exports = {
  Query: {
    recipes: async (_, __, { dataSources }) =>
      dataSources.recipeAPI.getAllRecipes(),
    getRecipesByIngredients: async (_, { ingredients }, { dataSources }) =>
      dataSources.recipeAPI.getRecipeByIngredientList( { ingredients } ),
    getRecipeById: async (_, { id }, { dataSources }) =>
      dataSources.recipeAPI.getRecipeById({id}),
    getRecipeBySearch: async (_, { query }, { dataSources }) =>
      dataSources.recipeAPI.getRecipeBySearch({query})
  }
};