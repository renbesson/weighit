"use client";

import { useState } from "react";
import { getItems } from "@/app/ingredients/actions/getItems";
import { updateItem } from "@/app/ingredients/actions/updateItem";
import useSWR from "swr";

const fetcher = async (url: string) => await getItems(url);

export default function UpdateRecipe({ params }: { params: { id: string } }) {
  const { data: recipe } = useSWR("recipe", fetcher) as any;
  const { data: ingredients } = useSWR("ingredients", fetcher) as {
    data: Ingredient[];
  };
  const [ingrCount, setIngrCount] = useState(0);
  const updateItemWithId = updateItem.bind(null, params.id, "recipe");

  return (
    <form className="form-control max-w-md gap-3 m-auto" action={updateItemWithId}>
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
          defaultValue={recipe?.name}
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
          defaultValue={recipe?.servings}
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
              {ingredients.map((ingr: Ingredient) => (
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
