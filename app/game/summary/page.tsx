"use client";

import Button from "@/app/components/Button";
import useSummary from "@/app/components/hooks/useSummary";
import Link from "next/link";

const Summary = () => {
  const { totalScore, navigateToNewGame } = useSummary();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <h2 className="font-semibold">Total score: {totalScore} of 50000</h2>

      <div className="flex gap-5">
        <Link href={"/game"} />
        <Link href={"/rankings"} />
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
