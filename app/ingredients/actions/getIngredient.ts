import prisma from "@/lib/prisma";

export default async function getIngredient(id: string) {
  "use server";

  try {
    const ingredient = await prisma.ingredient.findUnique({ where: { id: id } });

    if (!ingredient) {
      return { message: "No ingredient found." };
    }

    return ingredient;
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
