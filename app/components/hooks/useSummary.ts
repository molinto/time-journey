import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { finishGame, selectTotalScore } from "@/app/game/answersSlice";
import { useEffect } from "react";
import axios from "axios";

const useSummary = () => {
  const totalScore = useAppSelector(selectTotalScore);
  const router = useRouter();
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

  const navigateToNewGame = async () => {
    router.push("/game");
  };

  return { navigateToNewGame, totalScore };
};

export default useSummary;
