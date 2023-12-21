import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ingrId = searchParams.get("id");

  if (!ingrId) {
    return new NextResponse(JSON.stringify({ name: "Please provide an ingredient ID." }), {
      status: 400,
    });
  }

  try {
    const ingredients = await prisma.ingredient.findUnique({ where: { id: ingrId } });

    if (!ingredients) {
      return new NextResponse(JSON.stringify({ name: "No ingredients found." }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(ingredients), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error }), {
      status: 400,
    });
  }
}
