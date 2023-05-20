import { useParams } from "next/navigation";
import { useAppSelector } from "../utils/reduxHooks";
import { formatDistance } from "../utils/gameUtils";
const useQuestionResults = () => {
  const params = useParams();

  const currentQuestionNumber = parseInt(params.slug);

  const answer = useAppSelector(
    (state) => state.game.answers[currentQuestionNumber - 1]
  );

  const imageSrc = useAppSelector(
    (state) => state.game.questions[currentQuestionNumber - 1].imageSrc
  );

  const {
    gameLocation,
    gameYear,
    userLocation,
    userYear,
    distance,
    distanceScore,
    yearDifference,
    yearScore,
  } = answer;

  const formattedDistance = formatDistance(distance);

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
    imageSrc,
  };
};

export default useQuestionResults;
