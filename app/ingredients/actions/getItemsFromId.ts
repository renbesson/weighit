"use server";

import prisma from "@/lib/prisma";

export async function getItemsFromId(id: string, type: string) {
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
