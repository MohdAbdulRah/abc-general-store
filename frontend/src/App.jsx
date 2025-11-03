import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import HeroSlider from "./components/HeroSlider";
import { api } from "./api/api";

const App = () => {
  const [view, setView] = useState("home");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(i => i.productId === product._id);
      if (found) {
        return prev.map(i =>
          i.productId === product._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: product._id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.productId !== id));

  const updateQuantity = (id, qty) => {
    setCart(prev =>
      prev.map(i =>
        i.productId === id ? { ...i, quantity: Math.max(1, qty) } : i
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header cartCount={cart.length} onView={setView} />
      <main className="flex-grow p-6">
        {view === "home" &&
        <> 
         <HeroSlider />
        <ProductList products={products} onAdd={addToCart} />
        </>
        }
        {view === "cart" && (
          <Cart
            cart={cart}
            onRemove={removeFromCart}
            onUpdate={updateQuantity}
            onCheckout={() => setView("checkout")}
          />
        )}
        {view === "checkout" && (
          <Checkout
            cart={cart}
            setCart={setCart}
            onBack={() => setView("home")}
          />
        )}
      </main>
      <footer className="bg-blue-600 text-white text-center py-3">
        © {new Date().getFullYear()} ABC General Store
      </footer>
    </div>
  );
};

export default App;
