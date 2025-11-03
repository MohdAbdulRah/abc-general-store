import { api } from "../api/api";
import React from "react";

export default function Checkout({ cart, setCart, onBack }) {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePayment = async () => {
    try {
      const res = await api.post("/orders/create-order", {
        items: cart.map(i => ({ productId: i.productId, quantity: i.quantity })),
        amount: total,
      });

      const { razorpayOrder } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "ABC General Store",
        description: "Purchase",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          await api.post("/orders/verify", response);
          alert("Payment Successful ✅");
          setCart([]);
          onBack();
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="text-gray-700 mb-2">Total: ₹{total}</p>
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
      >
        Pay Now
      </button>
    </div>
  );
}
