"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { calculateTotalCost } from "@/app/functions/calculateTotalCost";
import { getRecipeWithIngredients } from "@/app/actions/getRecipeWithIngredients";
import { calculateIngredientCost } from "@/app/functions/calculateIngredientCost";
import toCurrency from "@/app/functions/toCurrency";

const fetcher = async (id: string) => await getRecipeWithIngredients(id);

export default function RecipePage({ params }: { params: { id: string } }) {
  const { data: recipe } = useSWR(params.id, fetcher) as unknown as { data: RecipeWithIngredients };
  const [customServings, setCustomServings] = useState(recipe?.servings);
  const totalCost = calculateTotalCost(recipe?.recipeIngredients, customServings) || 0;

  useEffect(() => {
    setCustomServings(recipe?.servings);
  }, [recipe?.servings]);

  const IngrsView = () => {
    return (
      <table className="table table-sm">
        <tbody>
          <tr>
            <th>Amount</th>
            <th>Name</th>
            <th>Cost</th>
          </tr>
          {recipe?.recipeIngredients?.map((ingr: any) => {
            const qtyPerServing = ingr.quantity / recipe.servings;
            const currentQty = qtyPerServing * customServings;
            const ingredientCost = calculateIngredientCost(ingr, customServings) || 0;

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
                <td>{toCurrency(ingredientCost)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Total Cost:</th>
            <th>{toCurrency(totalCost)}</th>
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
            value={customServings ?? 0}
            type="number"
            onChange={(e) => setCustomServings(Number(e.target.value))}
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
