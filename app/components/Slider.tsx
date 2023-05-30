import React, { ChangeEvent } from "react";

interface SliderProps {
  year: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ping?: boolean;
  disabled?: boolean;
}

const Slider = ({
  year,
  onChange,
  ping = false,
  disabled = false,
}: SliderProps) => {
  return (
    <div className="flex w-full flex-col items-center">
      {/* <label className="pb-2">Use slider to pick a year</label> */}
      <div className="relative flex w-full items-center justify-center">
        <div
          className={`absolute z-20 cursor-pointer select-none font-semibold text-white ${
            disabled ? "cursor-default" : "cursor-pointer"
          }`}
        >
          {year}
        </div>
        {ping && (
          <div className="absolute right-2 top-2 z-30 h-1 w-1 animate-ping rounded-full bg-white"></div>
        )}
        <input
          disabled={disabled}
          min={1900}
          max={2023}
          step={1}
          value={year}
          onChange={onChange}
          type="range"
          className={`h-10 w-full appearance-none rounded-lg bg-brick-red ${
            disabled ? "cursor-default" : "cursor-pointer"
          }`}
        />
      </div>
    </div>
  );
};

export default Slider;
