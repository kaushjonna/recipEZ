const { RESTDataSource } = require('apollo-datasource-rest');
const app_id = '28da6923';
const app_key = '6e01410ac6dc18e0ab8c86743d51eedf';

class RecipeAPI extends RESTDataSource {
  constructor () {
    super();
    this.baseURL = 'http://api.yummly.com/v1/api';
  }

  willSendRequest(request) {
    request.headers.set('X-Yummly-App-ID', app_id);
    request.headers.set('X-Yummly-App-Key', app_key);
  }

  async recipeReducer (recipe) {

    return {

      id: recipe.id,
      totalTime: recipe.totalTimeInSeconds,
      name: recipe.recipeName,
      ingredients: recipe.ingredients,
      rating: recipe.rating

    }

  }

  async getAllRecipes() {
    const response = await this.get('/recipes');
    const results = response.matches;
    const out  = results.map(recipe => this.recipeReducer(recipe));
    return out;

  }

}

module.exports = RecipeAPI;