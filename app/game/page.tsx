"use client";

import Link from "next/link";
import Button from "../components/Button";
import useGame from "../components/hooks/useGame";
import Spinner from "../components/Spinner";
import { useAppDispatch } from "../components/utils/reduxHooks";
import { open } from "../components/modals/modalSlice";
import Slider from "../components/Slider";
import { ChangeEvent } from "react";

const Game = () => {
  const { status } = useGame();
  const dispatch = useAppDispatch();

  if (status === "loading") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Button
          label={"Login"}
          type={"button"}
          onClick={() => dispatch(open("login"))}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-3">
      <p className="px-8 text-center leading-9 md:max-w-lg xl:max-w-2xl">
        Each round will feature a new photograph. You'll have to guess the
        correct year using slider and location using map.<br></br> The more
        accurate your guess, the higher your score. Good Luck!
      </p>
      <Link href="/game/question/1" className="flex w-full justify-center">
        <Button label={"Begin!"} type={"button"} />
      </Link>
    </div>
  );
};

export default Game;
