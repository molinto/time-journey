"use client";

import Link from "next/link";
import Button from "../components/Button";
import useGame from "./useGame";
import Spinner from "../components/Spinner";
import { useAppDispatch } from "../components/utils/reduxHooks";
import { open } from "../components/modals/modalSlice";
import Image from "next/image";
import Slider from "../components/Slider";

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
        Each round will feature a new photograph. You&apos;ll have to guess the
        correct year and location using slider and map.
      </p>
      <div className="flex w-full flex-col items-center justify-center gap-5 lg:flex-row">
        <div className="w-[250px]">
          <Slider disabled year={1963} onChange={() => {}} />
        </div>
        <Image
          src="/mapExample.png"
          width={250}
          height={250}
          alt="Map showcase"
          className="rounded"
          quality={100}
          priority
        />
      </div>
      <p> The more accurate your guess, the higher your score. Good Luck!</p>
      <Link href="/game/question/1" className="flex w-full justify-center">
        <Button label={"Begin"} type={"button"} />
      </Link>
    </div>
  );
};

export default Game;
