import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { addAnswer, fetchAnswerById } from "@/app/game/gameSlice";
import { useRouter, useParams } from "next/navigation";

const useQuestion = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const currentQuestionNumber = parseInt(params.slug) - 1;

  const currentQuestion = useAppSelector(
    (state) => state.game.questions[currentQuestionNumber]
  );

  const [year, setYear] = useState(1963);
  const [userMarker, setUserMarker] = useState<Coordinates | null>(null);
  const rightAnswer = useAppSelector((state) =>
    state.game.rightAnswers.find((answer) => answer.id === currentQuestion.id)
  );
  const isDone = rightAnswer != undefined;
  const rightYear = rightAnswer?.year;
  const rightMarker = rightAnswer?.coordinates;

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
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
      id: currentQuestion.id,
      year: year,
      coordinates: userMarker,
    };

    dispatch(addAnswer(answer));
    dispatch(fetchAnswerById(answer.id));
    router.push(`/game/question/${params.slug}/results`);
  };
  return {
    handleYearSlider,
    handleSubmitQuestion,
    handleMapClick,
    year,
    userMarker,
    rightMarker,
    rightYear,
  };
};

export default useQuestion;
