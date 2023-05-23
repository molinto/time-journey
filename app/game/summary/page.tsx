"use client";

import Button from "@/app/components/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/components/utils/reduxHooks";
import { selectTotalScore } from "../answersSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const totalScore = useAppSelector(selectTotalScore);
  const router = useRouter();

  const firstQuestionId = useAppSelector(
    (state) => state.questions.value[0].id
  );
  const gameFinished = useAppSelector(
    (state) => state.answers.value.length === 5
  );

  useEffect(() => {
    if (!gameFinished) return;

    const data = {
      id: firstQuestionId,
      score: totalScore,
    };

    axios.post("/api/saveScore", data);
  }, [firstQuestionId, gameFinished, totalScore]);

  const newGame = async () => {
    router.push("/game");
  };

  return (
    <div className="">
      <h2>Total score: {totalScore} / 50000</h2>
      <Button onClick={newGame} label={"New Game"} type={"button"} />
    </div>
  );
};

export default Summary;
