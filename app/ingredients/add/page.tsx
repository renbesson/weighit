import { apiUrl } from "@/lib/setUrl";
import { redirect } from "next/navigation";

async function create(formData: FormData) {
  "use server";
  let success;

  try {
    const res = await fetch(`https://${apiUrl}/api/ingredient`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Failed to create ingredient: ${res.statusText}`);
    }

    success = true;
  } catch (error) {
    console.error("Update failed:", error);
  }

  // needed until they fix the bug which prevent the use of
  // redirect inside a try...catch block
  if (success) return redirect("/ingredients");
}

export default function AddIngredient() {
  return (
    <form className="form-control max-w-md gap-3 m-auto" action={create}>
      <h3 className="font-bold text-lg text-center">Add Ingredient</h3>
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
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
          placeholder="Eg: 1000"
          className="input input-bordered w-full"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Create
      </button>
    </form>
  );
}
