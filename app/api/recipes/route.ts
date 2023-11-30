import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const recipes = await prisma.recipe.findMany();

    if (!recipes) {
      return new NextResponse(JSON.stringify({ name: "No recipes found." }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(recipes), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error }), {
      status: 400,
    });
  } finally {
    await prisma.$disconnect();
  }
}
