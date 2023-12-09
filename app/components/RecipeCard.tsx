import Image from "next/image";
import Link from "next/link";
import { deleteItem } from "../ingredients/actions/deleteItem";

interface Props {
  id: string;
  name: string;
  servings: number;
  ingredients: Ingredient[];
  directions: string;
  image: string;
}

export default function RecipeCard({ id, name, servings, ingredients, directions, image }: Props) {
  const deleteItemWithId = deleteItem.bind(null, id, "recipe");

  return (
    <form className="card card-compact bg-base-100 shadow-xl w-96 image-full">
      <figure>
        <Image
          className="w-auto h-auto"
          src={image || "/images/placeholder.jpg"}
          alt=""
          width={256}
          height={128}
        />
      </figure>

      <div className="card-body">
        <Link className="card-title" href={`/recipes/${id}`}>
          {name}
        </Link>
        <div className="absolute bottom-3 right-3">
          <button className="btn btn-primary btn-square m-1">
            <Image src="/icons/editImg.svg" alt="" width={24} height={24} />
          </button>

          <Link href={`/ingredients/update/${id}`} className="btn btn-primary btn-square m-1">
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
