"use client";

import Link from "next/link";
import Button from "../components/Button";
import useGame from "../components/hooks/useGame";

const Game = () => {
  const { error, status } = useGame();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {status === "loading" ? (
        <div className="">loading</div>
      ) : status === "failed" ? (
        <div className="">{error}</div>
      ) : (
        <Link href="/game/question/1">
          <Button label={"Start"} type={"button"} />
        </Link>
      )}
    </div>
  );
};

export default Game;
