import { PrismaClient } from "@prisma/client";

export default async function getIngredients() {
  "use server";

  const prisma = new PrismaClient();

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
