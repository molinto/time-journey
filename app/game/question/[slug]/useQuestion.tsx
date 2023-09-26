import { ChangeEvent, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../components/utils/reduxHooks";
import { useParams } from "next/navigation";
import { addAnswer } from "@/app/game/answersSlice";
import { Coordinates } from "@/types";

const useQuestion = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const currentQuestionNumber = parseInt(params.slug) - 1;

  const currentQuestion = useAppSelector(
    (state) => state.questions?.value[currentQuestionNumber]
  );

  const answer = useAppSelector(
    (state) => state.answers?.value[currentQuestionNumber] || null
  );

  const finalMarkers =
    answer?.gameLocation && answer?.userLocation
      ? {
          userMarker: answer?.userLocation,
          gameMarker: answer?.gameLocation,
        }
      : undefined;

  const questionsLoading = useAppSelector(
    (state) => state.questions.status === "loading"
  );

  const resultsLoading = useAppSelector(
    (state) => state.answers.status === "loading"
  );

  const [year, setYear] = useState(1963);
  const [yearChanged, setYearChanged] = useState(false);
  const [marker, setMarker] = useState<Coordinates | null>(null);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setMarker({
      lat: e.latLng?.lat(),
      lng: e.latLng?.lng(),
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleYearSlider = (event: ChangeEvent<HTMLInputElement>) => {
    setYearChanged(true);
    setYear(parseInt(event.currentTarget.value));
  };

  const handleSubmitQuestion = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!marker || !currentQuestion) return;

    const answer: UserAnswer = {
      id: currentQuestion.id,
      year,
      coordinates: marker,
    };

    await dispatch(addAnswer(answer));
  };

  return {
    handleYearSlider,
    handleSubmitQuestion,
    handleMapClick,
    year,
    marker,
    resultsLoading,
    questionsLoading,
    answer,
    finalMarkers,
    currentQuestionNumber,
    yearChanged,
  };
};

export default useQuestion;
