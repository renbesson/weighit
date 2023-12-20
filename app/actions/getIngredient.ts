"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export async function getIngredient(id: string) {
  // unstable_noStore is equivalent to cache: 'no-store' on a fetch
  noStore();

  const ingredient = await prisma.ingredient.findUnique({ where: { id: id } });

  return ingredient;
}
