import React, { ChangeEvent, useState } from "react";

interface SliderProps {
  year: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Slider = ({ year, onChange }: SliderProps) => {
  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="absolute z-20 font-semibold text-white">{year}</div>
      <input
        min={1900}
        max={2023}
        step={1}
        value={year}
        onChange={onChange}
        type="range"
        className="h-10 w-full cursor-pointer appearance-none rounded-lg bg-brick-red"
      />
    </div>
  );
};

export default Slider;
