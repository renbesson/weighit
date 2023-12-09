"use server";

import prisma from "@/lib/prisma";

export default async function getIngredients() {
  try {
    const ingredients = await prisma.ingredient.findMany();

    if (!ingredients) {
      return { message: "No ingredients found." };
    }

    return ingredients;
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
