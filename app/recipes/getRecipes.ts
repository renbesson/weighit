import prisma from "@/lib/prisma";

export default async function getRecipes() {
  "use server";

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
