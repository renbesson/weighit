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
    <div className="card card-compact bg-base-100 shadow-xl w-96 image-full">
      <figure>
        <Image width={320} height={240} alt="" src={image || "/images/placeholder.jpg"} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <span>Price: ${price}</span>
        <span>Weight: {weight}gr</span>
        <div className="absolute bottom-3 right-3">
          <button className="btn btn-primary btn-circle m-1">
            <img src="/icons/editImg.svg" />
          </button>
          <button className="btn btn-primary btn-circle m-1">
            <img src="/icons/edit.svg" />
          </button>
          <button className="btn btn-error btn-circle m-1">
            <img src="/icons/delete.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}
