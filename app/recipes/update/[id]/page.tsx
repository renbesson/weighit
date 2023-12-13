import { updateItem } from "@/app/ingredients/actions/updateItem";
import { getItem } from "@/app/ingredients/actions/getItem";

export default async function UpdateRecipe({ params }: { params: { id: string } }) {
  const recipe: Recipe = (await getItem(params.id, "recipe")) as any;

  const updateItemWithId = updateItem.bind(null, params.id, "recipe");

  return (
    recipe && (
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

        <div>
          <label className="label">
            <span className="label-text">Directions</span>
          </label>
          <textarea
            id="directions"
            name="directions"
            required
            defaultValue={recipe?.directions}
            placeholder="Type here the directions for this recipe..."
            className="textarea textarea-bordered w-full"
            rows={5}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </form>
    )
  );
}
