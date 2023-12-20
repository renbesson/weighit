import Image from "next/image";
import Link from "next/link";
import { deleteItem } from "../actions/deleteItem";
import { calculateTotalCost } from "../functions/calculateTotalCost";
import toCurrency from "../functions/toCurrency";

export default async function RecipeCard({ recipe }: { recipe: RecipeWithIngredients }) {
  const deleteItemWithId = deleteItem.bind(null, recipe.id, "recipe");

  const cost = calculateTotalCost(recipe.recipeIngredients, recipe.servings);

  return (
    <form className="card card-compact bg-base-100 shadow-xl w-96 image-full">
      <figure>
        <Image
          className="w-auto h-auto"
          src={recipe.image || "/images/placeholder.jpg"}
          alt=""
          width={256}
          height={128}
        />
      </figure>

      <div className="card-body">
        <Link className="card-title" href={`/recipes/${recipe.id}`}>
          {recipe.name}
        </Link>
        <span>Total Price: {toCurrency(cost)}</span>
        <div className="absolute bottom-3 right-3">
          <button className="btn btn-primary btn-square m-1">
            <Image src="/icons/editImg.svg" alt="" width={24} height={24} />
          </button>

          <Link
            href={`/recipes/update/ingredients/${recipe.id}`}
            className="btn btn-primary btn-square m-1"
          >
            <Image src="/icons/garlic.svg" alt="" width={24} height={24} />
          </Link>

          <Link href={`/recipes/update/${recipe.id}`} className="btn btn-primary btn-square m-1">
            <Image src="/icons/edit.svg" alt="" width={24} height={24} />
          </Link>

          <button className="btn btn-error btn-square m-1" formAction={deleteItemWithId}>
            <Image src="/icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </form>
  );
}
