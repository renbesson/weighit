import { Ingredient, RecipeIngredient } from "@prisma/client";

export function calculateTotalCost(
  recipeIngredients: RecipeIngredientWithIngredient[],
  servings: number
) {
  return (
    recipeIngredients?.reduce((accumulator, recipeIngredient) => {
      const price = recipeIngredient.ingredient.price;
      const weight = recipeIngredient.ingredient.weight;

      const costPerGram = price / weight;
      const ingredientCost = costPerGram * servings;

      return accumulator + ingredientCost;
    }, 0) || 0
  );
}
