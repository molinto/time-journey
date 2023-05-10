import { useParams } from "next/navigation";
import { useAppSelector } from "../utils/reduxHooks";
import { calculateDistance, formatDistance } from "../utils/calculateDistance";

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

  const distance = calculateDistance(
    userAnswer?.coordinates,
    rightAnswer?.coordinates
  );

  const formattedDistance = formatDistance(distance);

  const noData = !userAnswer?.coordinates || !rightAnswer?.coordinates;
  const markers = noData
    ? undefined
    : {
        userMarker: userAnswer.coordinates,
        rightMarker: rightAnswer.coordinates,
      };

  return {
    formattedDistance,
    currentQuestionNumber,
    currentQuestion,
    rightAnswer,
    userAnswer,
    markers,
  };
};

export default useQuestionResults;
