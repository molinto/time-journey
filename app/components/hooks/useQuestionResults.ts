import { useParams } from "next/navigation";
import { useAppSelector } from "../utils/reduxHooks";
import { formatDistance } from "../utils/gameUtils";
const useQuestionResults = () => {
  const params = useParams();

  const currentQuestionNumber = parseInt(params.slug);

  const answer = useAppSelector(
    (state) => state.answers.value[currentQuestionNumber - 1]
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
  };
};

export default useQuestionResults;
