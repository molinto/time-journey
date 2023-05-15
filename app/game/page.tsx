"use client";

import Link from "next/link";
import Button from "../components/Button";
import useGame from "../components/hooks/useGame";

const Game = () => {
  const { currentQuestionNumber } = useGame();

  return (
    <div className="">
      <Link href={`/game/question/${currentQuestionNumber}`}>
        <Button label={"Start"} type={"button"} />
      </Link>
    </div>
  );
};

export default Game;
