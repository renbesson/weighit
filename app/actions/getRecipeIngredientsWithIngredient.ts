"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export async function getRecipesIngredientsWithIngredient(recipeId: string) {
  // unstable_noStore is equivalent to cache: 'no-store' on a fetch
  noStore();

  const ingredients = await prisma.recipeIngredient.findMany({
    where: { recipeId: recipeId },
    include: { ingredient: true },
  });

  return ingredients;
}
