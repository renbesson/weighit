interface RecipeIngredient {
  id: string;
  quantity: number;
  recipe: Recipe;
  ingredient: Ingredient;
  ingredientId: string;
  recipeId: string;
}
