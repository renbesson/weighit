interface Ingredient {
  id: string;
  name: string;
  price: number;
  weight: number;
  image?: Buffer;
}

interface AddIngredient {
  name: string;
  price: number;
  weight: number;
}
