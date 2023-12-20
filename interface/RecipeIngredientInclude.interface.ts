import { Ingredient } from "@prisma/client";

type RecipeIngredientInclude = {
  id: string;
  recipeId: string;
  ingredientId: string;
  ingredient: Ingredient;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};
