import { PrismaClient } from "@prisma/client";

export default async function getRecipes() {
  "use server";

  const prisma = new PrismaClient();

  try {
    const recipes = await prisma.recipe.findMany();

    if (!recipes) {
      return { message: "No recipes found." };
    }

    return recipes;
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
