import React, { useState, useEffect } from "react";

const images = [
  "/banners/1.png",
  "/banners/3.png",
  "/banners/2.png",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative w-full h-48 sm:h-60 md:h-80 lg:h-[32rem] overflow-hidden bg-gray-200">
      <img
        src={images[current]}
        alt="Banner"
        className="
          w-full h-full
          object-contain         /* Mobile - full image, no crop */
          md:object-cover        /* Desktop - fill screen */
          md:object-center
          transition-all duration-700
        "
      />

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow"
      >
        ❯
      </button>
    </div>
  );
}
