import { updateItem } from "@/app/actions/updateItem";
import { getRecipesIngredientsWithIngredient } from "@/app/actions/getRecipeIngredientsWithIngredient";

export default async function UpdateIngredientsRecipe({ params }: { params: { id: string } }) {
  const recipeIngredients = await getRecipesIngredientsWithIngredient(params.id);

  const updateItemWithId = updateItem.bind(null, params.id, "recipeIngredient");

  return (
    <form className="form-control max-w-md gap-3 m-auto" action={updateItemWithId}>
      <h3 className="font-bold text-lg text-center">Update Recipe Ingredients</h3>

      <table className="table table-xs">
        <tbody>
          <tr>
            <th>Ingredient</th>
            <th>Amount</th>
          </tr>

          {recipeIngredients.map((ingr, index) => (
            <tr key={ingr.id}>
              <td>{ingr.ingredient.name}</td>
              <td>
                <input
                  className="input input-bordered input-xs max-w-[64px]"
                  defaultValue={ingr.quantity}
                  name={`ingr-${ingr.id}`}
                />
                <span> gram(s)</span>
              </td>
            </tr>
          ))}
          <tr>
            <th>Ingredient</th>
            <th>Amount</th>
          </tr>
        </tbody>
      </table>

      <button className="btn btn-primary" type="submit">
        Update
      </button>
    </form>
  );
}
