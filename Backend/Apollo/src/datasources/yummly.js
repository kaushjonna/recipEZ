const { RESTDataSource } = require('apollo-datasource-rest');
const app_id = '28da6923';
const app_key = '6e01410ac6dc18e0ab8c86743d51eedf';

class RecipeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.yummly.com/v1/api';
  }

  willSendRequest(request) {
    request.headers.set('X-Yummly-App-ID', app_id);
    request.headers.set('X-Yummly-App-Key', app_key);
  }

  async recipeReducer(recipe) {

    return {

      id: recipe.id,
      totalTime: recipe.totalTimeInSeconds,
      name: recipe.recipeName,
      image: recipe.smallImageUrls[0],
      ingredients: recipe.ingredients,
      rating: recipe.rating

    }

  }

  async getAllRecipes() {

    const response = await this.get('/recipes');
    const results = response.matches;
    return results.map(recipe => this.recipeReducer(recipe));
  }

  async getRecipeByIngredientList(ingredientList) {
    let yummlyQuery = '';


    ingredientList.ingredients.forEach(ingredient => {
      yummlyQuery += this.buildQuery(ingredient);
    });

    const response = await this.get(`/recipes?${yummlyQuery}`);
    return response.matches.map(recipe => this.recipeReducer(recipe));
  }

  buildQuery(input) {
    return `&allowedIngredient[]=${input}`
  }


}

module.exports = RecipeAPI;