import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import {
  calculateDistance,
  calculateDistanceScore,
  calculateYearsDifference,
  calculateYearsScore,
  formatDistance,
} from "../utils/gameUtils";
import { useEffect } from "react";
import { addScore } from "@/app/game/gameSlice";

const useQuestionResults = () => {
  const params = useParams();

  const currentQuestionNumber = parseInt(params.slug);

  const currentQuestion = useAppSelector(
    (state) => state.game.questions[currentQuestionNumber - 1]
  );
  const answer = useAppSelector(
    (state) => state.game.answers[currentQuestionNumber - 1]
  );

  const {
    gameLocation,
    gameYear,
    id,
    userLocation,
    userYear,
    distance,
    distanceScore,
    yearDifference,
    yearScore,
  } = answer;

  const formattedDistance = formatDistance(distance);
  // const rightAnswer = useAppSelector((state) =>
  //   state.game.rightAnswers.find((answer) => answer.id === currentQuestion.id)
  // );
  // const userAnswer = useAppSelector((state) =>
  //   state.game.userAnwers.find((answer) => answer.id === currentQuestion.id)
  // );

  // const noData = !userAnswer || !rightAnswer;

  // const distance = noData
  //   ? null
  //   : calculateDistance(userAnswer.coordinates, rightAnswer.coordinates);

  // const formattedDistance = noData ? null : formatDistance(distance);

  // const markers = noData
  //   ? undefined
  //   : {
  //       userMarker: userAnswer.coordinates,
  //       rightMarker: rightAnswer.coordinates,
  //     };

  // const yearsScore = noData
  //   ? null
  //   : calculateYearsScore(userAnswer.year, rightAnswer.year);

  // const yearsDifference = noData
  //   ? null
  //   : calculateYearsDifference(userAnswer.year, rightAnswer.year);

  // const distanceScore = noData ? null : calculateDistanceScore(distance);

  // useEffect(() => {
  //   if (!yearsScore || !distanceScore) return;
  //   dispatch(addScore(yearsScore + distanceScore));
  // }, [yearsScore, distanceScore]);

  return {
    gameLocation,
    gameYear,
    userLocation,
    userYear,
    formattedDistance,
    distanceScore,
    yearDifference,
    yearScore,
    currentQuestionNumber,
  };
};

export default useQuestionResults;
