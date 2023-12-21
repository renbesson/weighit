export function calculateIngredientCost(
  recipeIngredient: RecipeIngredientWithIngredient,
  servings: number
) {
  const price = recipeIngredient.ingredient.price;
  const weight = recipeIngredient.ingredient.weight;

  const costPerGram = price / weight;
  const ingredientCost = costPerGram * servings;

  return ingredientCost;
}
