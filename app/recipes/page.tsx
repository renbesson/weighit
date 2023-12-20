import Link from "next/link";
import RecipeCard from "../components/RecipeCard";
import { getItems } from "../actions/getItems";
import { Recipe } from "@prisma/client";

export default async function Recipes() {
  const recipes = (await getItems("recipes")) as Recipe[];

  return (
    <div className="flex flex-row flex-wrap justify-center gap-5 p-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      <Link
        className="btn btn-secondary btn-square absolute right-5 bottom-5"
        href={"/recipes/add"}
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
