interface Ingr {
  id: string;
  weight: number;
}

interface Recipe {
  id: string;
  name: string;
  servings: number;
  directions: string;
  ingredients: Ingr[];
  image: string;
}
