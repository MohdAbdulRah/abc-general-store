import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onAdd }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={() => onAdd(p)} />
        ))}
      </div>
    </div>
  );
}
