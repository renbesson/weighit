import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RecipeIngr {
  ingredient: { connect: { id: string } };
  quantity: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get("id");

  if (!recipeId) {
    return new NextResponse(JSON.stringify({ message: "Please provide a recipe ID." }), {
      status: 400,
    });
  }

  try {
    const recipes = await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: { ingredients: { include: { ingredient: true } } },
    });

    if (!recipes) {
      return new NextResponse(JSON.stringify({ message: "No recipes found." }), {
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

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();

  let ingrCount = 0;
  for (const pair of formData.entries()) {
    const [key] = pair;

    if (key.startsWith("ingr")) {
      ingrCount++;
    }
  }

  // Returns an array of ingredients with their id and weight.
  const ingrs: RecipeIngr[] = Array.from(Array(ingrCount).keys()).map((_, index) => {
    const regex = /\[([^[\]]+)\]/;

    const ingr = formData.get(`ingr${index}`)?.toString() ?? "";
    const ingrId = ingr.match(regex) ?? []; // match everything that is inside a parenthesis

    return {
      ingredient: { connect: { id: ingrId[1] } }, //
      quantity: Number(formData.get(`quantity${index}`)),
    };
  });

  try {
    const recipe = await prisma.recipe.create({
      data: {
        name: formData.get("name") as string,
        servings: Number(formData.get("servings")) as number,
        directions: formData.get("directions") as string,
        image: "",
        ingredients: {
          create: ingrs,
        },
      },
      include: {
        ingredients: true, // Include posts when fetching the user
      },
    });

    if (!recipe) {
      return new NextResponse(JSON.stringify({ name: "Error adding recipe." }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(recipe), {
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

// INCOMPLETE I just copied from the POST function and it needs to be formatted
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get("id") as string;
  const formData: FormData = await req.formData();

  let ingrCount = 0;
  for (const pair of formData.entries()) {
    const [key] = pair;

    if (key.startsWith("ingr")) {
      ingrCount++;
    }
  }

  // Returns an array of ingredients with their id and weight.
  const ingrs: RecipeIngr[] = Array.from(Array(ingrCount).keys()).map((_, index) => {
    const regex = /\[([^[\]]+)\]/;

    const ingr = formData.get(`ingr${index}`)?.toString() ?? "";
    const ingrId = ingr.match(regex) ?? []; // match everything that is inside a parenthesis

    return {
      ingredient: { connect: { id: ingrId[1] } }, //
      quantity: Number(formData.get(`quantity${index}`)),
    };
  });

  try {
    const recipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        name: formData.get("name") as string,
        servings: Number(formData.get("servings")) as number,
        directions: formData.get("directions") as string,
        image: "",
        ingredients: {
          create: ingrs,
        },
      },
      include: {
        ingredients: true, // Include posts when fetching the user
      },
    });

    if (!recipe) {
      return new NextResponse(JSON.stringify({ name: "Error adding recipe." }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(recipe), {
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

/* export async function PUT(req: NextRequest) {
  const formData: FormData = await req.formData();
  const recipeId = (formData.get("id") as string) ?? "";
  let ingrCount = Number(formData.get("ingrCount"));

  if (!recipeId) {
    return new NextResponse(JSON.stringify({ message: "Please provide an recipe to update." }), {
      status: 400,
    });
  }

  // Returns an array of ingredients with their id and weight.
  const ingrs: Ingredient[] = Array.from(Array(ingrCount).keys()).map((ingrCount) => {
    const regex = /\(([^)]+)\)/;

    const ingr = formData.get(`ingr${ingrCount}`)?.toString() ?? "";
    const ingrId = ingr.match(regex) ?? [];

    return {
      id: ingrId[1],
      quantity: Number(formData.get(`weight${ingrCount}`)),
    };
  });

  try {
    const ingUpdated = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        name: formData.get("name") as string,
        servings: Number(formData.get("servings")) as number,
        directions: formData.get("directions") as string,
        image: "",
        ingredients: ingrs,
      },
    });

    if (!ingUpdated) {
      return new NextResponse(JSON.stringify({ name: "Error updating recipe." }), {
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
} */

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get("id");

  console.log("id: ", recipeId);

  if (!recipeId) {
    return new NextResponse(JSON.stringify({ message: "Please provide an recipe to delete." }), {
      status: 400,
    });
  }

  try {
    const ingDeleted = await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    if (!ingDeleted) {
      return new NextResponse(JSON.stringify({ message: "Error deleting recipe." }), {
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
