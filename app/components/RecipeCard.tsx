"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RecipeCard({ id, name, servings, image }: Recipe) {
  const router = useRouter();

  async function deleteRecipe(id: string) {
    let success;

    try {
      const res = await fetch(`/api/recipe?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete recipe: ${res.statusText} (${res.status})`);
      }
      success = true;
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      // needed until they fix the bug which prevent the use of
      // redirect inside a try...catch block
      if (success) return router.refresh();
    }
  }

  return (
    <div className="card card-compact bg-base-100 shadow-xl w-96 image-full">
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
        <span>Servings: {servings}</span>
        <div className="absolute bottom-3 right-3">
          <button className="btn btn-primary btn-square m-1">
            <Image src="/icons/editImg.svg" alt="" width={256} height={128} />
          </button>
          <Link href={`/ingredients/update/${id}`} className="btn btn-primary btn-square m-1">
            <Image src="/icons/edit.svg" alt="" width={256} height={128} />
          </Link>
          <button className="btn btn-error btn-square m-1" onClick={() => deleteRecipe(id)}>
            <Image src="/icons/delete.svg" alt="" width={256} height={128} />
          </button>
        </div>
      </div>
    </div>
  );
}
