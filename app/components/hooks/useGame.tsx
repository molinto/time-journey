"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import {
  fetchQuestions,
  selectCurrentQuestionNumber,
} from "@/app/game/gameSlice";
import { useRouter } from "next/navigation";

const useGame = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentQuestionNumber = useAppSelector(
    (state) => state.game.rightAnswers.length + 1
  );
  const isStarted =
    useAppSelector((state) => state.game.questions).length !== 0;

  useEffect(() => {
    if (isStarted) {
      router.push(`/game/question/${currentQuestionNumber}`);
    }
    dispatch(fetchQuestions());
  }, [dispatch, isStarted]);

  const checkResults = () => {};
  return { checkResults, currentQuestionNumber };
};

export default useGame;
