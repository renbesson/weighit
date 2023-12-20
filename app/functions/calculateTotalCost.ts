import { Ingredient, RecipeIngredient } from "@prisma/client";

export function calculateTotalCost(
  recipeIngredients: RecipeIngredientWithIngredient[],
  servings: number
) {
  let totalCost = 0;

  recipeIngredients?.forEach((ingr) => {
    const qty = ingr.quantity;
    const costPerGram = ingr.ingredient.price / ingr.ingredient.weight;
    const costOfIngr = costPerGram * qty;

    totalCost += costOfIngr;
  });

  return totalCost;
}
