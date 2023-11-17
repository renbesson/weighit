import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  price: number;
  weight: number;
  image: string;
}

export default function Card({ title, price, weight, image }: Props) {
  return (
    <div className="card card-side bg-base-100 shadow-xl w-96 image-full">
      <figure>
        <Image width={320} height={240} alt="" src={image || "/images/placeholder.jpg"} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <span>Price: ${price}</span>
        <span>Weight: {weight}gr</span>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  );
}
