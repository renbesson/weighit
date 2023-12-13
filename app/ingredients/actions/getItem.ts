"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export async function getItem(id: string, type: string) {
  // unstable_noStore is equivalent to cache: 'no-store' on a fetch
  noStore();

  switch (type) {
    /////////////////////////////////////////////
    // Ingredient getting logic
    /////////////////////////////////////////////
    case "ingredient":
      const ingredient = await prisma.ingredient.findUnique({ where: { id: id } });

      if (!ingredient) {
        return { message: `No ingredient found with ID ${id}.` };
      }

      return ingredient as Ingredient;

    /////////////////////////////////////////////
    // Recipe getting logic
    /////////////////////////////////////////////
    case "recipe":
      const recipe = await prisma.recipe.findUnique({
        where: { id: id },
        include: { ingredients: { include: { ingredient: true } } },
      });

      if (!recipe) {
        return { message: `No recipe found with ID ${id}.` };
      }

      return recipe;

    default:
      return JSON.stringify({ message: "Invalid 'type' argument." });
  }
}
