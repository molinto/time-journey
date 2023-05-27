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
    yearChanged,
    handleMapClick,
    year,
    handleSubmitQuestion,
    resultsLoading,
    answer,
    finalMarkers,
  } = useQuestion();

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <MapContainer>
        <GMap
          currentMarker={marker}
          finalMarkers={finalMarkers}
          handleMapClick={handleMapClick}
        />
      </MapContainer>
      {resultsLoading ? (
        <div className="lg:pt-20">
          <Spinner blue />
        </div>
      ) : answer ? (
        <Results {...answer} />
      ) : (
        <div className="flex w-full flex-col items-center gap-6 lg:pt-3">
          <Slider ping={!yearChanged} year={year} onChange={handleYearSlider} />
          <Button
            type="button"
            label={marker ? "Submit!" : "Place a pin on the map!"}
            disabled={!marker}
            onClick={handleSubmitQuestion}
          />
        </div>
      )}
    </div>
  );
};

export default Question;
