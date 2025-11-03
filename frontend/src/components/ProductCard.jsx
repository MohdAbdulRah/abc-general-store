import React from "react";

export default function ProductCard({ product, onAdd }) {
    return (
      <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-blue-600">₹{product.price}</span>
          <button
            onClick={onAdd}
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    );
  }
  