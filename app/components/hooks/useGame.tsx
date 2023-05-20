"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { fetchQuestions } from "@/app/game/gameSlice";
import { useRouter } from "next/navigation";

const useGame = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentQuestionIndex = useAppSelector(
    (state) => state.game.answers.length
  );

  const game = useAppSelector((state) => state.game);

  const { status, error } = game;
  const gameIsOn = currentQuestionIndex > 0 && currentQuestionIndex < 4;

  useEffect(() => {
    if (gameIsOn) {
      router.push(`/game/question/${currentQuestionIndex + 1}`);
    } else {
      dispatch(fetchQuestions());
    }
  }, [currentQuestionIndex, dispatch, router]);

  const checkResults = () => {};
  return { checkResults, status, error };
};

export default useGame;
