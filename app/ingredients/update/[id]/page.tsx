import { getItem } from "../../../actions/getItem";
import { updateItem } from "../../../actions/updateItem";

export default async function UpdateIngredient({ params }: { params: { id: string } }) {
  const ingredient = await getItem(params.id, "ingredient") as Ingredient;
  const updateItemWithId = updateItem.bind(null, params.id, "ingredient");

  return (
    <form className="form-control max-w-md gap-3 m-auto" action={updateItemWithId}>
      <h3 className="font-bold text-lg text-center">Update Ingredient</h3>
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={ingredient?.name}
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
          defaultValue={ingredient?.price}
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
          defaultValue={ingredient?.weight}
          placeholder="Eg: 1000"
          className="input input-bordered w-full"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Update
      </button>
    </form>
  );
}
