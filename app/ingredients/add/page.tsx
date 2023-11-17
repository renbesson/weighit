import { redirect } from "next/navigation";

export default function AddIngredient() {
  async function create(formData: FormData) {
    "use server";

    const res = await fetch("http://localhost:3000/api/ingredient", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to create ingredient.");
    }

    redirect("/ingredients");
  }

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
