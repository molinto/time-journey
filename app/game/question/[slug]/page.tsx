"use client";

import useQuestion from "@/app/components/hooks/useQuestion";
import Image from "next/image";
import Slider from "@/app/components/Slider";
import Button from "@/app/components/Button";
import GMap from "@/app/components/GMap";

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
          src="/test.jpg"
          alt="Photo"
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="relative flex min-w-[432px] flex-col items-center justify-start gap-5 p-4">
        <GMap currentMarker={userMarker} handleMapClick={handleMapClick} />
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
