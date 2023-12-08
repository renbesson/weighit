import { useState } from "react";

export default function AddButton() {
  const [ingrCount, setIngrCount] = useState(0);
  return (
    <button className="btn" onClick={() => setIngrCount((prev) => prev + 1)}>
      Add Ingredient
    </button>
  );
}
