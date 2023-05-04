"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { selectCurrentQuestionNumber } from "@/app/game/gameSlice";

const useGame = () => {
  const dispatch = useAppDispatch();
  const currentQuestion = useAppSelector(selectCurrentQuestionNumber);
  const gameFinished = useAppSelector(selectCurrentQuestionNumber) >= 5;
  // const rightAnswer: Answer = {
  //   id: "123",
  //   year: 1995,
  //   coordinates: {
  //     lat: "2",
  //     lon: "3",
  //   },

  const calculateScore = (userAnswer: Answer, rightAnswer: Answer) => {
    const score: number = 3000;
    return {
      userAnswer,
      rightAnswer,
      score,
    };
  };

  // const submitQuestion = () => {
  //   if (currentQuestionNumber === 5) {
  //     checkResults();
  //   }
  //   nextQuestion();
  // };

  const checkResults = () => {};
  return {
    checkResults,
    gameFinished,
  };
};

export default useGame;
