"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { getItem } from "@/app/actions/getItem";

const fetcher = async (id: string) => await getItem(id, "recipe");

export default function RecipePage({ params }: { params: { id: string } }) {
  const { data: recipe } = useSWR(params.id, fetcher) as any;
  const [customServings, setCustomServings] = useState(recipe?.servings);

  useEffect(() => {
    setCustomServings(recipe?.servings);
  }, [recipe?.servings]);

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
            const qtyPerServing = ingr.quantity / recipe.servings;
            const currentQty = qtyPerServing * customServings;
            const costOfIngr = costPerGram * currentQty;

            totalCost += costOfIngr;

            return (
              <tr key={ingr.id}>
                <td>
                  {currentQty && (
                    <span className="font-bold">
                      {currentQty > 10 ? currentQty.toFixed(0) : currentQty.toFixed(1)}
                    </span>
                  )}{" "}
                  gram(s)
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
