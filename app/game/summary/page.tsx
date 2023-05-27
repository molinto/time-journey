"use client";

import Button from "@/app/components/Button";
import useSummary from "@/app/components/hooks/useSummary";
import Link from "next/link";

const Summary = () => {
  const { totalScore } = useSummary();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <div className="">{totalScore > 25000 ? "Well Done!" : "Nice Try!"}</div>
      <div className="flex w-full justify-between md:max-w-xs ">
        <p className="font">Total score: </p>
        <p className="font">{totalScore}&#47;50000</p>
      </div>

      <div className="flex w-full justify-between gap-5 md:max-w-sm">
        <Link href={"/game"} className="w-full">
          <Button label={"New Game"} type={"button"} />
        </Link>
        <Link href={"/rankings"} className="w-full">
          <Button label={"View Ranking"} type={"button"} />
        </Link>
        {/* <Button
          onClick={navigateToNewGame}
          label={"New Game"}
          type={"button"}
        />
        <Button
          onClick={navigateToNewGame}
          label={"New Game"}
          type={"button"}
        /> */}
      </div>
    </div>
  );
};

export default Summary;
