"use client";

import Button from "@/app/components/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/components/utils/reduxHooks";
import { finishGame, selectTotalScore } from "../answersSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const Summary = () => {
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

  const newGame = async () => {
    router.push("/game");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <h2 className="font-semibold">Total score: {totalScore} of 50000</h2>

      <div className="flex gap-5">
        <Button onClick={newGame} label={"New Game"} type={"button"} />
      </div>
    </div>
  );
};

export default Summary;
