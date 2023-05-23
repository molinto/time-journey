"use client";

import useQuestion from "@/app/components/hooks/useQuestion";
import Slider from "@/app/components/Slider";
import Button from "@/app/components/Button";
import GMap from "@/app/components/GMap";
import MapContainer from "@/app/components/MapContainer";
import Spinner from "@/app/components/Spinner";
import { useAppSelector } from "@/app/components/utils/reduxHooks";

const Question = () => {
  const {
    userMarker,
    handleYearSlider,
    handleMapClick,
    year,
    handleSubmitQuestion,
    loading,
  } = useQuestion();

  const questionsLoading = useAppSelector(
    (state) => state.questions.status === "loading"
  );

  return questionsLoading ? (
    <Spinner />
  ) : (
    <>
      {loading ? (
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
    </>
  );
};

export default Question;
