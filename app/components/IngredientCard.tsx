"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  title: string;
  price: number;
  weight: number;
  image: string;
}

export default function IngredientCard({ id, title, price, weight, image }: Props) {
  const router = useRouter();
  
  async function deleteIngr(id: string) {
    let success;
    const formData = new FormData();
    formData.append("id", id);

    try {
      const res = await fetch(`${process.env.API_URL}/api/ingredient?id=${id}`, {
        method: "DELETE",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to update ingredient: ${res.statusText}`);
      }
      success = true;
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      // needed until they fix the bug which prevent the use of
      // redirect inside a try...catch block
      if (success) return router.refresh();
    }
  }

  return (
    <div className="card card-compact bg-base-100 shadow-xl w-96 image-full">
      <figure>
        <img className="w-auto h-auto" alt="" src={image || "/images/placeholder.jpg"} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <span>Price: ${price}</span>
        <span>Weight: {weight}gr</span>
        <div className="absolute bottom-3 right-3">
          <button className="btn btn-primary btn-square m-1">
            <img src="/icons/editImg.svg" />
          </button>
          <Link href={`/ingredients/update/${id}`} className="btn btn-primary btn-square m-1">
            <img src="/icons/edit.svg" />
          </Link>
          <button className="btn btn-error btn-square m-1" onClick={() => deleteIngr(id)}>
            <img src="/icons/delete.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}
