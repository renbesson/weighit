import { Ingredient, Prisma } from "@prisma/client";
import RecipeCard from "../components/RecipeCard";

export {};

declare global {
  type RecipeWithIngredients = Prisma.RecipeGetPayload<{
    include: {
      recipeIngredients: { include: { ingredient: true } };
    };
  }>;
  type RecipeIngredientWithIngredient = Prisma.RecipeIngredientGetPayload<{
    include: {
      ingredient: true;
    };
  }>;
}
