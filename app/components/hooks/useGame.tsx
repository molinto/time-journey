"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { fetchQuestions } from "@/app/game/gameSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginModal from "../modals/LoginModal";
import { open } from "../modals/modalSlice";

const useGame = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentQuestionIndex = useAppSelector(
    (state) => state.game.answers.length
  );
  const { data: session } = useSession();

  const game = useAppSelector((state) => state.game);

  const { status, error } = game;
  const gameIsOn = currentQuestionIndex > 0 && currentQuestionIndex < 4;

  useEffect(() => {
    if (!session) return;
    if (gameIsOn) {
      router.push(`/game/question/${currentQuestionIndex + 1}`);
      return;
    }
    dispatch(fetchQuestions());
  }, [currentQuestionIndex, dispatch, router, gameIsOn, session]);

  const checkResults = () => {};
  return { checkResults, status, error, session };
};

export default useGame;
