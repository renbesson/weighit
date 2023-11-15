import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const ingredients = await prisma.ingredient.findMany();

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
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const data: Ingredient = await req.json();

  try {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: <string>data.name,
        price: <number>data.price,
        weight: <number>data.weight,
      },
    });

    if (!ingredient) {
      return new NextResponse(JSON.stringify({ name: "Error adding ingredient." }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(ingredient), {
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
