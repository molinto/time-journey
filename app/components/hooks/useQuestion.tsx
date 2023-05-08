import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { addAnswer, selectCurrentQuestion } from "@/app/game/gameSlice";

const useQuestion = () => {
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const dispatch = useAppDispatch();
  const [year, setYear] = useState(1963);
  const [userMarker, setUserMarker] = useState<Coordinates | null>(null);
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    // console.log(e.latLng?.toString());
    if (!e.latLng) return;
    setUserMarker({
      lat: e.latLng?.lat(),
      lng: e.latLng?.lng(),
    });
  };

  const handleYearSlider = (event: ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(event.currentTarget.value));
  };

  const handleSubmitQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userMarker) return;

    const answer: Answer = {
      year: year,
      coordinates: userMarker,
      id: currentQuestion.id,
    };
    // console.log(currentQuestionNumber);
    dispatch(addAnswer(answer));
    setUserMarker(null);
    setYear(1963);
  };
  return {
    handleYearSlider,
    handleSubmitQuestion,
    handleMapClick,
    year,
    userMarker,
  };
};

export default useQuestion;
