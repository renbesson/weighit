"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

async function createRecipe(formData: FormData) {
  let success;

  try {
    const res = await fetch("api/recipe", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Failed to create recipe: ${res.statusText}`);
    }

    success = true;
  } catch (error) {
    console.error("Update failed:", error);
  }

  // needed until they fix the bug which prevent the use of
  // redirect inside a try...catch block
  if (success) return redirect("/recipes");
}

async function getRecipes(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes.");
  }

  return res.json();
}

export default function AddRecipe() {
  const [ingrCount, setIngrCount] = useState(0);

  const { data: ingrs } = useSWR("api/ingredients", getRecipes);

  return (
    <form className="form-control max-w-md gap-3 m-auto" action={createRecipe}>
      <h3 className="font-bold text-lg text-center">Add Recipe</h3>
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Eg: Protein Blend"
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Servings</span>
        </label>
        <input
          id="servings"
          name="servings"
          type="number"
          required
          placeholder="Eg: 5"
          className="input input-bordered w-full"
        />
      </div>

      {[...Array(ingrCount)].map((_, index) => (
        <div className="flex flex-row justify-between gap-2" key={index}>
          <div className="w-full">
            <label className="label">
              <span className="label-text">Ingredient {index + 1}</span>
            </label>
            <select
              id={`ingr${index}`}
              name={`ingr${index}`}
              placeholder="Eg: Eggs"
              className="select select-bordered input-sm w-full"
              defaultValue=""
            >
              <option hidden disabled value="">
                Select...
              </option>
              {ingrs.map((ingr: Ingredient) => (
                <option id={ingr.id} key={ingr.id}>
                  {ingr.name} [{ingr.id}]
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="label">
              <span className="label-text">Quantity (gr)</span>
            </label>
            <input
              id={`quantity${index}`}
              name={`quantity${index}`}
              required
              placeholder="Eg: 300"
              className="input input-bordered w-full"
            />
          </div>
        </div>
      ))}

      <button className="btn" onClick={() => setIngrCount((prev) => prev + 1)}>
        Add Ingredient
      </button>

      <div>
        <label className="label">
          <span className="label-text">Directions</span>
        </label>
        <textarea
          id="directions"
          name="directions"
          required
          placeholder="Type here the directions for this recipe..."
          className="textarea textarea-bordered w-full"
          rows={5}
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Create
      </button>
    </form>
  );
}
