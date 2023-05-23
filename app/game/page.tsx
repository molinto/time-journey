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
    <div className="flex h-full flex-col items-center justify-center">
      {/* {status === "loading" ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
        </div>
      ) : status === "failed" ? (
        <div className="">{error}</div>
      ) : (
        <Link href="/game/question/1">
          <Button label={"Start"} type={"button"} />
        </Link>
      )} */}
      <Link href="/game/question/1">
        <Button label={"Start"} type={"button"} />
      </Link>
    </div>
  );
};

export default Game;
