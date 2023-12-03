import { apiUrl } from "@/lib/setUrl";
import { redirect } from "next/navigation";

async function getIngr(id: string) {
  try {
    const res = await fetch(`${apiUrl}/api/ingredient?id=${id}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Update failed:", error);
  }
}

export default async function UpdateIngredient({ params }: { params: { id: string } }) {
  const ingr = await getIngr(params.id);

  async function updateIngr(formData: FormData) {
    "use server";
    formData.append("id", params.id);
    let success;

    try {
      const res = await fetch(`${apiUrl}/api/ingredient?id=${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to update ingredient: ${res.statusText}`);
      }
      success = true;
    } catch (error) {
      console.error("Update failed:", error);
    }

    // needed until they fix the bug which prevent the use of
    // redirect inside a try...catch block
    if (success) return redirect("/ingredients");
  }

  return (
    <form className="form-control max-w-md gap-3 m-auto" action={updateIngr}>
      <h3 className="font-bold text-lg text-center">Update Ingredient</h3>
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={ingr?.name}
          placeholder="Eg: Bubbaloo"
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Price</span>
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step=".01"
          required
          defaultValue={ingr?.price}
          placeholder="Eg: 3.95"
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Weight</span>
        </label>
        <input
          id="weight"
          name="weight"
          type="number"
          step=".01"
          required
          defaultValue={ingr?.weight}
          placeholder="Eg: 1000"
          className="input input-bordered w-full"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Update
      </button>
    </form>
  );
}
