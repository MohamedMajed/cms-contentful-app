"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageSlider({ allCategories: allCategories }: { allCategories: any[] }): JSX.Element {
  const images = allCategories.map((category) => category.image.url);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDotClick = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full mx-auto mt-4">
      <div className="relative h-[700px] mx-0">
        <Image
          loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality}`}
          src={images[currentIndex]}
          alt={`Slider Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-500 ease-in-out cursor-pointer"
          unoptimized={true}
        />
      </div>
      <div className="flex justify-center absolute bottom-0 left-0 w-full mb-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 mx-1 ${index === currentIndex
              ? "bg-black rounded-full"
              : "bg-gray-300 rounded-full"
              } transition-all duration-500 ease-in-out`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}