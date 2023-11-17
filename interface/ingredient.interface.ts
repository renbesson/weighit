interface Ingredient {
  id: string;
  name: string;
  price: number;
  weight: number;
  image?: string;
}

interface AddIngredient {
  name: string;
  price: number;
  weight: number;
}
