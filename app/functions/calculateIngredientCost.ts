export function ingredientCostPerServing(
  recipeIngredient: RecipeIngredientWithIngredient,
  servings: number
) {
  const price = recipeIngredient.ingredient.price;
  const weight = recipeIngredient.ingredient.weight;
  const qty = recipeIngredient.quantity;

  const costPerGram = price / weight;
  const ingredientCost = costPerGram * qty;

  return ingredientCost / servings;
}
