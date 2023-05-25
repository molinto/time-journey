"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { fetchQuestions, resetQuestions } from "@/app/game/questionsSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { resetAnswers } from "@/app/game/answersSlice";

const useGame = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const answersLength = useAppSelector((state) => state.answers.value.length);
  const { data: session } = useSession();

  const game = useAppSelector((state) => state.answers);

  const { status, error } = game;

  useEffect(() => {
    if (!session) return;

    switch (answersLength) {
      case 0:
        dispatch(fetchQuestions());
        break;
      case 5:
        dispatch(resetQuestions());
        dispatch(resetAnswers());

        break;
      default:
        router.push(`/game/question/${answersLength + 1}`);
    }
  }, [answersLength, dispatch, router, session]);

  return { status, error, session };
};

export default useGame;
