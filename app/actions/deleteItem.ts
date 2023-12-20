"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteItem(id: string, type: string) {
  switch (type) {
    /////////////////////////////////////////////
    // Ingredient deleting logic
    /////////////////////////////////////////////
    case "ingredient":
      const ingredient = await prisma.ingredient.delete({
        where: {
          id,
        },
      });

      if (!ingredient) {
        return JSON.stringify({ message: "Error deleting ingredient." });
      }
      redirect("/ingredients");

    /////////////////////////////////////////////
    // Recipe deleting logic
    /////////////////////////////////////////////
    case "recipe":
      const recipe = await prisma.recipe.delete({
        where: {
          id,
        },
      });

      if (!recipe) {
        return JSON.stringify({ message: "Error deleting recipe." });
      }
      redirect("/recipes");

    default:
      return JSON.stringify({ message: "Invalid 'type' argument." });
  }
}
