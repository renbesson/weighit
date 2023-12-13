import { updateItem } from "@/app/ingredients/actions/updateItem";
import { getItemsFromId } from "@/app/ingredients/actions/getItemsFromId";

export default async function UpdateIngredientsRecipe({ params }: { params: { id: string } }) {
  const ingredients = (await getItemsFromId(
    params.id,
    "recipeIngredients"
  )) as unknown as RecipeIngredient[];

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

          {ingredients.map((ingr, index) => (
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
