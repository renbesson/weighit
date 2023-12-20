"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import { Ingredient, Recipe } from "@prisma/client";

export async function getItems(type: string) {
  // unstable_noStore is equivalent to cache: 'no-store' on a fetch
  noStore();

  switch (type) {
    /////////////////////////////////////////////
    // Ingredients getting logic
    /////////////////////////////////////////////
    case "ingredients":
      const ingredients = await prisma.ingredient.findMany();

      if (!ingredients) {
        return { message: "No ingredients found." };
      }

      

      return ingredients as Ingredient[];

    /////////////////////////////////////////////
    // Recipe getting logic
    /////////////////////////////////////////////
    case "recipes":
      const recipes = await prisma.recipe.findMany();

      if (!recipes) {
        return { message: "No recipes found." };
      }
      console.log(recipes);
      return recipes as Recipe[];

    default:
      return JSON.stringify({ message: "Invalid 'type' argument." });
  }
}
