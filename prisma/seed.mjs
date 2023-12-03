import prisma from "@/lib/prisma";

export async function main() {
  try {
    const response = await Promise.all([
      prisma.ingredient.create({
        data: {
          name: "Whole Milk",
          price: 3.79,
          weight: 2000,
        },
      }),
    ]);
    console.log(response);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
