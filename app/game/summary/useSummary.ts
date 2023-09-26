import {
  useAppDispatch,
  useAppSelector,
} from "../../components/utils/reduxHooks";
import { finishGame, selectTotalScore } from "@/app/game/answersSlice";
import { useEffect } from "react";
import axios from "axios";
import { Score } from "@/types";

const useSummary = () => {
  const totalScore = useAppSelector(selectTotalScore);
  const dispatch = useAppDispatch();

  const firstQuestionId = useAppSelector(
    (state) => state.questions?.value[0]?.id
  );
  const gameFinished = useAppSelector((state) => state.answers?.finished);

  useEffect(() => {
    if (gameFinished) return;

    const data = {
      firstQuestionId: firstQuestionId,
      score: totalScore,
    };

    const saveScore = async (data: Score) => {
      try {
        await axios.post("/api/saveScore", data);
        dispatch(finishGame());
      } catch (error) {
        console.log(error);
      }
    };
    saveScore(data);
  }, [gameFinished, firstQuestionId, totalScore, dispatch]);

  return { totalScore };
};

export default useSummary;
