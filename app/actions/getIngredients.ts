"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export async function getIngredients() {
  // unstable_noStore is equivalent to cache: 'no-store' on a fetch
  noStore();

  const ingredients = await prisma.ingredient.findMany();

  return ingredients;
}
