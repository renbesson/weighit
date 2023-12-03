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
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();

  try {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: formData.get("name") as string,
        price: Number(formData.get("price")) as number,
        weight: Number(formData.get("weight")) as number,
        image: "",
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

export async function PUT(req: NextRequest) {
  const formData: FormData = await req.formData();
  const { searchParams } = new URL(req.url);
  const ingrId = searchParams.get("id");

  if (!ingrId) {
    return new NextResponse(
      JSON.stringify({ message: "Please provide an ingredient to update." }),
      {
        status: 400,
      }
    );
  }

  try {
    const ingUpdated = await prisma.ingredient.update({
      where: {
        id: ingrId,
      },
      data: {
        name: formData.get("name") as string,
        price: Number(formData.get("price")) as number,
        weight: Number(formData.get("weight")) as number,
      },
    });

    if (!ingUpdated) {
      return new NextResponse(JSON.stringify({ name: "Error updating ingredient." }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(ingUpdated), {
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

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ingrId = searchParams.get("id");

  if (!ingrId) {
    return new NextResponse(
      JSON.stringify({ message: "Please provide an ingredient to delete." }),
      {
        status: 400,
      }
    );
  }

  try {
    const ingDeleted = await prisma.ingredient.delete({
      where: {
        id: ingrId,
      },
    });

    if (!ingDeleted) {
      return new NextResponse(JSON.stringify({ message: "Error deleting ingredient." }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(ingDeleted), {
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
