"use client";

import Button from "@/app/components/Button";
import GMap from "@/app/components/GMap";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/components/utils/reduxHooks";
import { useDispatch } from "react-redux";
import { fetchQuestions, reset, selectTotalScore } from "../gameSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const dispatch = useAppDispatch();
  const totalScore = useAppSelector(selectTotalScore);
  const router = useRouter();

  const firstQuestionId = useAppSelector(
    (state) => state.game?.questions[0]?.id
  );
  useEffect(() => {
    if (!firstQuestionId || totalScore === null || totalScore === undefined)
      return;

    const data = {
      id: firstQuestionId,
      score: totalScore,
    };
    axios.post("/api/saveScore", data);
  }, [firstQuestionId, totalScore]);

  const newGame = async () => {
    dispatch(reset());
    await dispatch(fetchQuestions());
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
