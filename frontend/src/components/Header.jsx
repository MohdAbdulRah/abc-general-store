import React, { useState } from "react";

export default function Header({ cartCount, onView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.jpg" // Place logo in /public/logo.png
            alt="ABC Store"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => onView("home")}
          />
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => onView("home")}
          >
            ABC General Store
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {["Home", "Products", "Services", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => item === "Home" ? onView("home") : null}
              className="hover:text-gray-300 transition"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => onView("cart")}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            Cart ({cartCount})
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500 text-white px-6 pb-4">
          {["Home", "Products", "Services", "About", "Contact"].map((item) => (
            <button
              key={item}
              className="w-full text-left py-2 hover:bg-blue-700 rounded"
              onClick={() => {
                if (item === "Home") onView("home");
                setMenuOpen(false);
              }}
            >
              {item}
            </button>
          ))}
          <button
            className="w-full bg-white text-blue-600 py-2 mt-2 rounded"
            onClick={() => {
              onView("cart");
              setMenuOpen(false);
            }}
          >
            Cart ({cartCount})
          </button>
        </div>
      )}
    </header>
  );
}
