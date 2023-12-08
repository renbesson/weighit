"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateItem(id: string, type: string, formData: FormData) {
  switch (type) {
    /////////////////////////////////////////////
    // Ingredient updating logic
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
    // Recipe updating logic // INCOMPLETE I just copied from the POST function and it needs to be formatted
    /////////////////////////////////////////////
    case "recipe":
      let ingrCount = 0;

      // Counts how many ingredients there are
      for (const pair of formData.entries()) {
        const [key] = pair;

        if (key.startsWith("ingr")) {
          ingrCount++;
        }
      }

      // Returns an array of ingredients with their id and weight.
      const ingrs = Array.from(Array(ingrCount).keys()).map((_, index) => {
        const regex = /\[([^[\]]+)\]/;

        const ingr = formData.get(`ingr${index}`)?.toString() ?? "";
        const ingrId = ingr.match(regex) ?? []; // match everything that is inside a parenthesis

        return {
          ingredient: { connect: { id: ingrId[1] } }, //
          quantity: Number(formData.get(`quantity${index}`)),
        };
      });

      const recipe = await prisma.recipe.update({
        where: { id: id },
        data: {
          name: formData.get("name") as string,
          servings: Number(formData.get("servings")) as number,
          directions: formData.get("directions") as string,
          image: "",
          ingredients: {
            create: ingrs,
          },
        },
        include: {
          ingredients: true, // Include posts when fetching the user
        },
      });

      // On error
      if (!recipe) {
        return JSON.stringify({ message: `Failed updating recipe.` });
      }

      // On success
      redirect("recipes");

    default:
      return JSON.stringify({ message: "Invalid 'type' argument." });
  }
}
