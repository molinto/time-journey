"use client";

import Button from "./Button";
import Slider from "./Slider";
import Map from "./GoogleMap";
import Image from "next/image";
import TestImage from "../../public/test.jpg";
import useQuestion from "./hooks/useQuestion";

const Question = () => {
  const {
    userMarker,
    handleYearSlider,
    handleMapClick,
    year,
    handleSubmitQuestion,
  } = useQuestion();

  return (
    <div className="flex h-full w-full">
      <div className="relative -z-10 h-full w-full bg-amber-100 ">
        <Image
          src={TestImage}
          alt="Photo"
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="relative flex min-w-[432px] flex-col items-center justify-start gap-5 p-4">
        <Map userMarker={userMarker} handleMapClick={handleMapClick} />
        <Slider year={year} onChange={handleYearSlider} />
        <Button
          type="button"
          label={userMarker ? "Submit!" : "Place a pin on the map!"}
          disabled={!userMarker}
          onClick={handleSubmitQuestion}
        />
      </div>
    </div>
  );
};

export default Question;
