"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import { Ingredient, Recipe } from "@prisma/client";

export async function getRecipesWithIngredients() {
  // unstable_noStore is equivalent to cache: 'no-store' on a fetch
  noStore();

  const recipesWithIngredients = await prisma.recipe.findMany({
    include: { recipeIngredients: { include: { ingredient: true } } },
  });

  return recipesWithIngredients;
}
