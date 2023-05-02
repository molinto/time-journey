"use client";

import { useEffect, useState } from "react";

const useGame = () => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState<"pregame" | "game" | "results">(
    "pregame"
  );

  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    setLoading(true);

    const fetchQuestion = async () => {};

    setQuestions([
      { id: "1", src: "one" },
      { id: "2", src: "two" },
      { id: "3", src: "three" },
      { id: "4", src: "four" },
      { id: "5", src: "five" },
    ]);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const fetchQuestionResults = async (id: string) => {
    const rightAnswer: Answer = {
      id: "123",
      year: 1995,
      coordinates: {
        lat: "2",
        lon: "3",
      },
    };
    return rightAnswer;
  };

  const calculateScore = (userAnswer: Answer, rightAnswer: Answer) => {
    const score: number = 3000;
    return {
      userAnswer,
      rightAnswer,
      score,
    };
  };

  const displayQuestionResults = async (id: string) => {};

  const displayGameResults = () => {
    setGameState("results");
    return 18889;
  };

  const submitQuestion = () => {
    if (currentQuestionNumber === 5) {
      checkResults();
    }
    nextQuestion();
  };

  const startGame = () => {
    setGameState("game");
  };

  const finishGame = () => {
    setGameState("results");
  };

  const nextQuestion = () => {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const checkResults = () => {};
  return {
    nextQuestion,
    currentQuestionNumber,
    checkResults,
    gameState,
    startGame,
    finishGame,
    questions,
    loading,
  };
};

export default useGame;
