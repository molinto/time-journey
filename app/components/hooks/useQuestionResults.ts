import { useParams } from "next/navigation";
import { useAppSelector } from "../utils/reduxHooks";
import {
  calculateDistance,
  calculateDistanceScore,
  calculateYearsDifference,
  calculateYearsScore,
  formatDistance,
} from "../utils/gameUtils";

const useQuestionResults = () => {
  const params = useParams();

  const currentQuestionNumber = parseInt(params.slug);

  const currentQuestion = useAppSelector(
    (state) => state.game.questions[currentQuestionNumber - 1]
  );
  const rightAnswer = useAppSelector((state) =>
    state.game.rightAnswers.find((answer) => answer.id === currentQuestion.id)
  );
  const userAnswer = useAppSelector((state) =>
    state.game.userAnwers.find((answer) => answer.id === currentQuestion.id)
  );

  const noData = !userAnswer || !rightAnswer;

  const distance = noData
    ? null
    : calculateDistance(userAnswer.coordinates, rightAnswer.coordinates);

  const formattedDistance = noData ? null : formatDistance(distance);

  const markers = noData
    ? undefined
    : {
        userMarker: userAnswer.coordinates,
        rightMarker: rightAnswer.coordinates,
      };

  const yearsScore = noData
    ? null
    : calculateYearsScore(userAnswer.year, rightAnswer.year);

  const yearsDifference = noData
    ? null
    : calculateYearsDifference(userAnswer.year, rightAnswer.year);

  const distanceScore = noData ? null : calculateDistanceScore(distance);

  return {
    formattedDistance,
    currentQuestionNumber,
    currentQuestion,
    rightAnswer,
    userAnswer,
    markers,
    yearsScore,
    yearsDifference,
    distanceScore,
  };
};

export default useQuestionResults;
