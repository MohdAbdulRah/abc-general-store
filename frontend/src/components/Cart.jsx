import React from "react";

export default function Cart({ cart, onRemove, onUpdate, onCheckout }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    if (cart.length === 0)
      return <div className="text-center text-gray-600 mt-20">🛒 Your cart is empty.</div>;
  
    return (
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => onUpdate(item.productId, Number(e.target.value))}
                className="border rounded px-2 py-1 w-16"
              />
              <button
                onClick={() => onRemove(item.productId)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
  
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-lg font-bold">Total: ₹{total}</h3>
          <button
            onClick={onCheckout}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
  }
  