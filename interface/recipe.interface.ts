interface Recipe {
  id: string;
  name: string;
  servings: number;
  directions: string;
  ingredients: RecipeIngredient[];
  image: string;
}
