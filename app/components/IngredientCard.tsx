"use client";

import Image from "next/image";
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
      const res = await fetch(`/api/ingredient?id=${id}`, {
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
        <Image
          className="w-auto h-auto"
          src={image || "/images/placeholder.jpg"}
          alt=""
          width={256}
          height={128}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <span>Price: ${price}</span>
        <span>Weight: {weight}gr</span>
        <div className="absolute bottom-3 right-3">
          <button className="btn btn-primary btn-square m-1">
            <Image src="/icons/editImg.svg" alt="" width={256} height={128} />
          </button>
          <Link href={`/ingredients/update/${id}`} className="btn btn-primary btn-square m-1">
            <Image src="/icons/edit.svg" alt="" width={256} height={128} />
          </Link>
          <button className="btn btn-error btn-square m-1" onClick={() => deleteIngr(id)}>
            <Image src="/icons/delete.svg" alt="" width={256} height={128} />
          </button>
        </div>
      </div>
    </div>
  );
}
