"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

interface SliderProps {
  defaultValue: number;
  onChange: (value: number) => void;
  thumbImage: string | StaticImageData;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
}

export const Slider2: React.FC<SliderProps> = ({
  defaultValue,
  onChange,
  thumbImage,
  setSliderValue,
}) => {
  const [value, setValue] = useState<number>(defaultValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const min = 0;
  const max = 80;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseMove(e as unknown as MouseEvent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && sliderRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const maxX = sliderRect.width * 0.8; // 80% of the slider width
      const newX = Math.max(0, Math.min(e.clientX - sliderRect.left, maxX));
      const newValue = Math.round((newX / maxX) * max);
      setValue(newValue);
      setSliderValue(newValue);
      onChange(newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  useEffect(() => {
    if (thumbRef.current && sliderRef.current) {
      const percentage = (value / max) * 80; // Scale to 80% of the track
      thumbRef.current.style.left = `${percentage}%`;
    }
  }, [value]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div ref={sliderRef} className="w-full border h-4 bg-[#F8FAFC] relative">
        <div className="absolute top-0 left-0 h-full w-4/5 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600"></div>
        <div
          ref={thumbRef}
          className="absolute p-[1px] bg-white top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 sm:w-8 h-[30px] sm:h-[38px] rounded-[4px] md:rounded-[5px] cursor-grab shadow-lg overflow-hidden flex items-center"
          style={{
            border: "1px solid #b5b4b4",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="relative flex">
            <Image
              className="z-10 bg-white w-3 h-3 sm:w-4 sm:h-4"
              src={thumbImage}
              alt="Slider thumb"
              width={32}
              height={32}
              layout="responsive"
            />
            <div className="absolute z-20 w-[100%] h-[100%] bg-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
