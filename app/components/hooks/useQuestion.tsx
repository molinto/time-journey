import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { useRouter, useParams } from "next/navigation";
import { addAnswer } from "@/app/game/answersSlice";

const useQuestion = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const currentQuestionNumber = parseInt(params.slug) - 1;

  const currentQuestion = useAppSelector(
    (state) => state.questions?.value[currentQuestionNumber]
  );

  const loadingResults = useAppSelector(
    (state) => state.answers.status === "loading"
  );

  const [year, setYear] = useState(1963);
  const [userMarker, setUserMarker] = useState<Coordinates | null>(null);

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

  const handleSubmitQuestion = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!userMarker || !currentQuestion) return;

    const answer: Answer = {
      id: currentQuestion.id,
      year: year,
      coordinates: userMarker,
    };
    await dispatch(addAnswer(answer));
    router.push(`/game/question/${params.slug}/results`);
  };

  return {
    handleYearSlider,
    handleSubmitQuestion,
    handleMapClick,
    year,
    userMarker,
    loading: loadingResults,
  };
};

export default useQuestion;
