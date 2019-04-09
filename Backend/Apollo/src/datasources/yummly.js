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

  async recipeReducerbyId(recipe) {

    return {

      id: recipe.id,
      totalTime: recipe.totalTimeInSeconds,
      name: recipe.recipeName,
      image: recipe.images[0].hostedSmallUrl,
      ingredients: recipe.ingredientLines,
      rating: recipe.rating

    }

  }

  async getRecipeById(id) {
    const response = await this.get(`/recipe/${id.id}`);
    return this.recipeReducerbyId(response)

  }

  async getAllRecipes() {

    const response = await this.get('/recipes');
    const results = response.matches;
    return results.map(recipe => this.recipeReducer(recipe));
  }

  async getRecipeBySearch(queryString) {
    let searchParams = '';
    console.log(queryString);
    const queryArray = queryString.query.split(" ");
    queryArray.forEach(query => {
      searchParams += this.buildSearchQuery(query)
    });

    const response = await this.get(`/recipes?${searchParams}`);
    return response.matches.map(recipe => this.recipeReducer(recipe));
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

  buildSearchQuery(input) {
    return `&q=${input}`;
  }


}

module.exports = RecipeAPI;