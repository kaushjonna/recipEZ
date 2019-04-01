module.exports = {
  Query: {
    recipes: async (_, { pageSize = 20, after }, { dataSources }) =>
      dataSources.recipeAPI.getAllRecipes(),
  }
};