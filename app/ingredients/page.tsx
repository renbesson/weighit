import Link from "next/link";
import IngredientCard from "../components/IngredientCard";
import getIngredients from "./actions/getIngredients";

export default async function Ingredients() {
  const ingredients = (await getIngredients()) as Ingredient[];

  return (
    <div className="flex flex-row flex-wrap justify-center gap-5 p-8">
      {ingredients.map((item: Ingredient) => (
        <IngredientCard
          key={item.id}
          id={item.id}
          title={item.name}
          price={item.price}
          weight={item.weight}
          image={item.image || ""}
        />
      ))}
      <Link
        className="btn btn-secondary btn-square absolute right-5 bottom-5"
        href="/ingredients/add"
      >
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M6 12H12M12 12H18M12 12V18M12 12V6"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </Link>
    </div>
  );
}
