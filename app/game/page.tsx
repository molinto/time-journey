"use client";

import Button from "../components/Button";
import Question from "../components/Question";
import useGame from "../components/hooks/6666666";

const Game = () => {
  const {
    gameState,
    questions,
    checkResults,
    startGame,
    finishGame,
    nextQuestion,
    currentQuestionNumber,
    loading,
  } = useGame();

  if (gameState === "pregame") {
    return <Button label={"Start"} type={"button"} onClick={startGame} />;
  }

  if (gameState === "results") {
    return (
      <div className="">
        <h1>Well done</h1>
      </div>
    );
  }

  return (
    <Question
      question={questions[currentQuestionNumber]}
      onSubmit={nextQuestion}
    />
  );
};

export default Game;
