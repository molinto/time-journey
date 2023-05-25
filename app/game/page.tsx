"use client";

import Link from "next/link";
import Button from "../components/Button";
import useGame from "../components/hooks/useGame";
import Spinner from "../components/Spinner";
import { useAppDispatch } from "../components/utils/reduxHooks";
import { open } from "../components/modals/modalSlice";

const Game = () => {
  const { session, error, status } = useGame();
  const dispatch = useAppDispatch();

  if (!session) {
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
      <p className="px-8 text-center text-lg leading-8 md:max-w-[30rem]">
        You will be given 5 photo questions. <br></br> Do your best to guess
        year and location of the photograph. Good Luck!
      </p>
      <Link href="/game/question/1" className="flex w-full justify-center">
        <Button label={"Begin!"} type={"button"} />
      </Link>
    </div>
  );
};

export default Game;
