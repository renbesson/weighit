import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get("id");

  if (!recipeId) {
    return new NextResponse(JSON.stringify({ message: "Please provide a recipe ID." }), {
      status: 400,
    });
  }

  const recipes = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: { recipeIngredients: { include: { ingredient: true } } },
  });

  if (!recipes) {
    return new NextResponse(JSON.stringify({ message: "No recipes found." }), {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify(recipes), {
    status: 200,
  });
}
