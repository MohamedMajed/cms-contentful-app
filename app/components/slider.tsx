"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageSlider({ allCategories: allCategories }: { allCategories: any[] }): JSX.Element {
  const images = allCategories.map((category) => category.image.url);
  const maxImages = 3; // Set the maximum number of images to display

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % maxImages);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

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
        {images.slice(currentIndex, currentIndex + maxImages).map((image, index) => (
          <Image
            key={index}
            loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality}`}
            src={image}
            alt={`Slider Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-500 ease-in-out cursor-pointer"
            unoptimized={true}
          />
        ))}
      </div>
      <div className="flex justify-center absolute bottom-0 left-0 w-full mb-4">
        {images.slice(0, maxImages).map((_, index) => (
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