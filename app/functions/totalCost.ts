"use server";

import { Ingredient, RecipeIngredient } from "@prisma/client";

export async function totalCost(ingredients: Ingredient[], servings: number) {
  let totalCost = 0;

  console.log(ingredients);

  ingredients.forEach((ingr) => {
    const qty = ingr.quantity;
    const costPerGram = ingr.ingredient.price / ingr.ingredient.weight;
    const costOfIngr = costPerGram * qty;

    totalCost += costOfIngr;
  });

  return totalCost;
}
