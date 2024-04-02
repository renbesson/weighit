import { Ingredient, RecipeIngredient } from "@prisma/client";

export function calculateTotalCost(
  recipeIngredients: RecipeIngredientWithIngredient[],
  servings: number
) {
  return (
    recipeIngredients?.reduce((accumulator, recipeIngredient) => {
      const price = recipeIngredient.ingredient.price;
      const weight = recipeIngredient.ingredient.weight;
      const qty = recipeIngredient.quantity;

      const costPerGram = price / weight;
      const ingredientCost = costPerGram * qty;

      return accumulator + (ingredientCost);
    }, 0) || 0
  );
}
