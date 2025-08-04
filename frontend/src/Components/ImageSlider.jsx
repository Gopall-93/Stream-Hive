import React, { useState, useEffect } from "react";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative hidden md:block md:w-1/2 h-[40vh] md:h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={image.url}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end justify-center">
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-12 px-4 text-center">
              {image.tag}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
