"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export async function getItemsFromId(id: string, type: string) {
  // unstable_noStore is equivalent to cache: 'no-store' on a fetch
  noStore();

  switch (type) {
    /////////////////////////////////////////////
    // Recipe Ingredients getting logic
    /////////////////////////////////////////////
    case "recipeIngredients":
      const ingredients = await prisma.recipeIngredient.findMany({
        where: { recipeId: id },
        include: { ingredient: true },
      });

      if (!ingredients) {
        return { message: "No ingredients found." };
      }

      return ingredients;
  }
}
