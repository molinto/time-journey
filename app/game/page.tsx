"use client";

import Button from "../components/Button";
import Question from "../components/Question";
import useGame from "../components/hooks/useGame";
import { useAppDispatch, useAppSelector } from "../components/utils/reduxHooks";
import Results from "./Results";
import { selectCurrentQuestion, startGame } from "./gameSlice";

const Game = () => {
  const preGame = !useAppSelector((state) => state.game.gameStarted);
  const dispatch = useAppDispatch();
  const { gameFinished, checkResults } = useGame();

  if (preGame) {
    return (
      <Button
        label={"Start"}
        type={"button"}
        onClick={() => dispatch(startGame())}
      />
    );
  }

  if (gameFinished) return <Results />;

  return <Question />;
};

export default Game;
