"use client";

import useQuestion from "@/app/components/hooks/useQuestion";
import Slider from "@/app/components/Slider";
import Button from "@/app/components/Button";
import GMap from "@/app/components/GMap";
import MapContainer from "@/app/components/MapContainer";
import Spinner from "@/app/components/Spinner";
import Results from "./Results";

const Question = () => {
  const {
    marker,
    handleYearSlider,
    handleMapClick,
    year,
    handleSubmitQuestion,
    resultsLoading,
    answer,
    finalMarkers,
  } = useQuestion();

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <MapContainer>
        <GMap
          currentMarker={marker}
          finalMarkers={finalMarkers}
          handleMapClick={handleMapClick}
        />
      </MapContainer>
      {resultsLoading ? (
        <div className="lg:pt-20">
          <Spinner />
        </div>
      ) : answer ? (
        <Results {...answer} />
      ) : (
        <>
          <Slider year={year} onChange={handleYearSlider} />
          <Button
            type="button"
            label={marker ? "Submit!" : "Place a pin on the map!"}
            disabled={!marker}
            onClick={handleSubmitQuestion}
          />
        </>
      )}
    </div>
  );
};

export default Question;
