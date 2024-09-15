"use client";
import { useState } from "react";

export default function Slider({
  min,
  max,
  step,
  defaultValue,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onChange: any;
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setValue(newValue);

    onChange(newValue);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-4  appearance-none cursor-pointer  bg-gradient-to-r from-green-600 via-yellow-600 to-red-600"
      />
    </div>
  );
}
