"use client";

import Button from "@/app/components/Button";
import GMap from "@/app/components/GMap";
import { useAppSelector } from "@/app/components/utils/reduxHooks";
import { useDispatch } from "react-redux";
import { reset } from "../gameSlice";
import { useRouter } from "next/navigation";

const Summary = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const newGame = () => {
    dispatch(reset());
    router.push("/game");
  };
  return (
    <div className="">
      <h2>Total score:</h2>
      <Button onClick={newGame} label={"New Game"} type={"button"} />
    </div>
  );
};

export default Summary;
