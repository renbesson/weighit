import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  try {
    const ingredients = await Promise.all([
      prisma.ingredient.createMany({
        data: [
          {
            name: "Whole Milk",
            price: 7.99,
            weight: 4000,
            image: "",
          },
          {
            name: "Eggs",
            price: 7.29,
            weight: 18,
            image: "",
          },
          {
            name: "Wheat Flour",
            price: 10.99,
            weight: 10000,
            image: "",
          },
          {
            name: "Water",
            price: 0,
            weight: 1000,
            image: "",
          },
          {
            name: "Margarine",
            price: 8.99,
            weight: 1700,
            image: "",
          },
          {
            name: "Yellow Onion",
            price: 1.54,
            weight: 1000,
            image: "",
          },
          {
            name: "Peeled Garlic",
            price: 8.89,
            weight: 1360,
            image: "",
          },
          {
            name: "Knnor Chicken",
            price: 3.97,
            weight: 150,
            image: "",
          },
          {
            name: "Paprika",
            price: 2.27,
            weight: 100,
            image: "",
          },
          {
            name: "Lean Ground Beef",
            price: 9.89,
            weight: 1000,
            image: "",
          },
          {
            name: "Bulgor (Kibbeh Wheat)",
            price: 6.47,
            weight: 2000,
            image: "",
          },
          {
            name: "Dehydrated Mint",
            price: 15.34,
            weight: 113,
            image: "",
          },
          {
            name: "Salt",
            price: 2.89,
            weight: 3000,
            image: "",
          },
          {
            name: "Olive Oil",
            price: 31.99,
            weight: 3000,
            image: "",
          },
          {
            name: "Bread Crumbs",
            price: 4.41,
            weight: 1000,
            image: "",
          },
          {
            name: "Frying Oil",
            price: 59.99,
            weight: 16000,
            image: "",
          },
          {
            name: "Canola Oil",
            price: 42.99,
            weight: 16000,
            image: "",
          },
          {
            name: "Almond Flour",
            price: 13.99,
            weight: 1360,
            image: "",
          },
          {
            name: "Chocolate Chips",
            price: 17.99,
            weight: 2000,
            image: "",
          },
          {
            name: "Mozzarella",
            price: 26.99,
            weight: 2200,
            image: "",
          },
          {
            name: "Cream Cheese",
            price: 9.49,
            weight: 1000,
            image: "",
          },
          {
            name: "Whipping Cream",
            price: 6.09,
            weight: 1000,
            image: "",
          },
          {
            name: "Gouda Cheese",
            price: 16.99,
            weight: 940,
            image: "",
          },
          {
            name: "Chicken Breast",
            price: 14.99,
            weight: 1000,
            image: "",
          },
          {
            name: "Carrots",
            price: 1.54,
            weight: 1000,
            image: "",
          },
          {
            name: "White Vinegar",
            price: 6.99,
            weight: 10000,
            image: "",
          },
          {
            name: "Black Pepper",
            price: 6.49,
            weight: 348,
            image: "",
          },
          {
            name: "Baking Powder",
            price: 6.99,
            weight: 900,
            image: "",
          },
          {
            name: "Sausages",
            price: 21.99,
            weight: 2025,
            image: "",
          },
          {
            name: "Cooked Ham",
            price: 13.99,
            weight: 1000,
            image: "",
          },
          {
            name: "Rosemary",
            price: 2.27,
            weight: 50,
            image: "",
          },
          {
            name: "Parsley Flakes",
            price: 2.97,
            weight: 48,
            image: "",
          },
          {
            name: "Oregano",
            price: 3.99,
            weight: 178,
            image: "",
          },
          {
            name: "Parsley Fresh",
            price: 1.99,
            weight: 50,
            image: "",
          },
        ],
      }),
    ]);
    console.log(ingredients);

    /* const recipes = await Promise.all([
      prisma.ingredient.create({
        data: [
          {
            name: "Bites Dough",
            servings: 200,
            directions: "Later...2.0",
          },
          {
            name: "Chicken Filling (20g)",
            servings: 200,
            directions:
              "Poke the chicken with a fork until all the breasts are all punctured.\r\n" +
              "Leave the chicken marinating in the fridge for 24 hours along with the other 9 first ingredients.\r\n",
          },
          {
            name: "Cheese Filling (20g)",
            servings: 200,
            directions: "Mix all ingredients. Warm the mix before putting it into the machine.",
          },
          {
            name: "Saugage Filling (20g)",
            servings: 200,
            directions: "None.",
          },
          {
            name: "Kibbeh (20g)",
            servings: 150,
            directions:
              "Combine all ingredients, but the lean ground beef in a bowl.\r\n" +
              "Mix throughly.\r\n" +
              "Wait 1 hour, add the ground beef, and mix throughly again.",
          },
        ],
      }),
    ]);
    console.log(recipes); */
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
