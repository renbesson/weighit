"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export async function getRecipeWithIngredients(id: string) {
  // unstable_noStore is equivalent to cache: 'no-store' on a fetch
  noStore();

  const recipe = await prisma.recipe.findUnique({
    where: { id: id },
    include: { recipeIngredients: { include: { ingredient: true } } },
  });

  return recipe;
}
