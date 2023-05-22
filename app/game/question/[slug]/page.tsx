"use client";

import useQuestion from "@/app/components/hooks/useQuestion";
import Image from "next/image";
import Slider from "@/app/components/Slider";
import Button from "@/app/components/Button";
import GMap from "@/app/components/GMap";
import MapContainer from "@/app/components/MapContainer";
import Spinner from "@/app/components/Spinner";

const Question = () => {
  const {
    userMarker,
    imageSrc,
    handleYearSlider,
    handleMapClick,
    year,
    handleSubmitQuestion,
    loading,
  } = useQuestion();

  return (
    <div className="flex h-full w-full">
      <div className="relative -z-10 h-full w-full bg-amber-100 ">
        <Image src={imageSrc} alt="Photo" fill className="object-contain p-4" />
      </div>
      <div className="relative flex min-w-[432px] flex-col items-center justify-start gap-5 p-4">
        {true ? (
          <div className="pt-20">
            <Spinner />
          </div>
        ) : (
          <>
            <Slider year={year} onChange={handleYearSlider} />
            <Button
              type="button"
              label={userMarker ? "Submit!" : "Place a pin on the map!"}
              disabled={!userMarker}
              onClick={handleSubmitQuestion}
            />
          </>
        )}
        <MapContainer>
          <GMap currentMarker={userMarker} handleMapClick={handleMapClick} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Question;
