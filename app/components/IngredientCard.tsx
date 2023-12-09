import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { deleteItem } from "../ingredients/actions/deleteItem";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  price: number;
  weight: number;
  image: string;
}

async function deleteIngredient(id: string) {
  "use server";
  const ingrDeleted = await prisma.ingredient.delete({
    where: {
      id,
    },
  });

  if (!ingrDeleted) {
    return JSON.stringify({ message: "Error deleting ingredient." });
  }
  redirect("/ingredients");
}

export default function IngredientCard({ id, title, price, weight, image }: Props) {
  const deleteItemWithId = deleteItem.bind(null, id, "ingredient");

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
        <h2 className="card-title">{title}</h2>
        <span>Price: ${price}</span>
        <span>Weight: {weight}gr</span>
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
