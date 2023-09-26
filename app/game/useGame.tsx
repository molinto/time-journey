"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../components/utils/reduxHooks";
import { fetchQuestions, resetQuestions } from "@/app/game/questionsSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { resetAnswers } from "@/app/game/answersSlice";

const useGame = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const answersLength = useAppSelector((state) => state.answers.value.length);
  console.log({ answersLength });
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") return;

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
  }, [answersLength, dispatch, router, status]);

  return { status };
};

export default useGame;
