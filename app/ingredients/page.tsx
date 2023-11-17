import Link from "next/link";
import Card from "../components/Card";

async function getData() {
  const res = await fetch("http://localhost:3000/api/ingredients", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
}

export default async function Ingredients() {
  const data = await getData();

  return (
    <div className="flex flex-row flex-wrap justify-center gap-5 p-8">
      {data.map((item: Ingredient) => (
        <Card
          key={item.id}
          title={item.name}
          price={item.price}
          weight={item.weight}
          image={item.image || ""}
        />
      ))}
      <Link
        className="btn btn-secondary btn-square absolute right-5 bottom-5"
        href={"/ingredients/add"}
      >
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M6 12H12M12 12H18M12 12V18M12 12V6"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </Link>
    </div>
  );
}