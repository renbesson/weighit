"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateItem(id: string, type: string, formData: FormData) {
  switch (type) {
    /////////////////////////////////////////////
    // Ingredient updating logic //
    /////////////////////////////////////////////
    case "ingredient":
      const ingredient = await prisma.ingredient.update({
        where: {
          id: id,
        },
        data: {
          name: formData.get("name") as string,
          price: Number(formData.get("price")) as number,
          weight: Number(formData.get("weight")) as number,
        },
      });

      // On error
      if (!ingredient) {
        return JSON.stringify({ message: `Failed updating ingredient.` });
      }
      // On success
      redirect("/ingredients");

    /////////////////////////////////////////////
    // Recipe updating logic //
    /////////////////////////////////////////////
    case "recipe":
      const recipe = await prisma.recipe.update({
        where: { id: id },
        data: {
          name: formData.get("name") as string,
          servings: Number(formData.get("servings")) as number,
          directions: formData.get("directions") as string,
        },
      });

      // On error
      if (!recipe) {
        return JSON.stringify({ message: `Failed updating recipe.` });
      }

      // On success
      redirect("/recipes");

    /////////////////////////////////////////////
    // Recipe updating logic //
    /////////////////////////////////////////////
    case "recipeIngredient":
      for (const pair of formData.entries()) {
        const name = pair[0];
        const value = pair[1];
        const ingrId = name.split("-")[1];

        if (!name.startsWith("ingr-")) continue;

        const recipeIngredient = await prisma.recipeIngredient.update({
          where: { id: ingrId, recipeId: id },
          data: {
            quantity: +value,
          },
        });

        // On error
        if (!recipeIngredient) {
          return JSON.stringify({ message: `Failed updating ingredient recipe.` });
        }
      }

      // On success
      redirect("/recipes");

    default:
      return JSON.stringify({ message: "Invalid 'type' argument." });
  }
}
