"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

async function getRecipe(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes.");
  }

  return res.json();
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const { data: recipe } = useSWR(`${process.env.API_URL}/api/recipe?id=${params.id}`, getRecipe);
  const [customServings, setCustomServings] = useState(recipe?.servings);

  useEffect(() => {
    setCustomServings(recipe?.servings)
  }, [recipe?.servings])

  const IngrsView = () => {
    let totalCost = 0;

    return (
      <table className="table table-sm">
        <tbody>
          <tr>
            <th>Amount</th>
            <th>Name</th>
            <th>Cost</th>
          </tr>
          {recipe?.ingredients?.map((ingr: any) => {
            const costPerGram = ingr.ingredient.price / ingr.ingredient.weight;
            const qtyPerServing = ingr.quantity / recipe.servings
            const currentQty = qtyPerServing * customServings
            const costOfIngr = costPerGram * currentQty;
            
            totalCost += costOfIngr;

            return (
              <tr key={ingr.id}>
                <td>
                  <span className="font-bold">{currentQty}</span> gram(s)
                </td>
                <td>{ingr.ingredient.name}</td>
                <td>
                  {costOfIngr.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Total Cost:</th>
            <th>
              {totalCost.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </th>
          </tr>
        </tfoot>
      </table>
    );
  };

  return (
    recipe && (
      <div className="flex flex-row flex-wrap justify-center gap-5 p-8">
        <div className="basis-4/6">
          <label className="label">
            <span className="text-lg font-bold">{recipe.name}</span>
          </label>
        </div>

        <div className="basis-1/6">
          <label className="label">
            <span className="label-text">Servings</span>
          </label>
          <input
            className="input input-bordered w-full"
            value={customServings ?? ""}
            type="number"
            onChange={(e) => setCustomServings(e.target.value)}
          />
        </div>

        <div className="basis-4/6">
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <IngrsView />
        </div>

        <div className="basis-full">
          <label className="label">
            <span className="label-text">Directions</span>
          </label>
          <p className="w-full">{recipe.directions}</p>
        </div>
      </div>
    )
  );
}
