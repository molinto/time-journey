"use client";

import Button from "@/app/components/Button";
import useSummary from "@/app/game/summary/useSummary";
import Image from "next/image";
import Link from "next/link";

const Summary = () => {
  const { totalScore } = useSummary();
  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-4 overflow-y-auto p-4 md:justify-start md:gap-10">
      <div className="relative h-[calc(100vh-15rem)] w-full">
        <Image
          src={"/summaryFull.png"}
          alt={"Game summary image"}
          fill
          sizes="100vw"
          className="rounded object-cover"
          priority
        />
      </div>
      <div className="flex w-full items-center justify-center gap-10 md:max-w-xs  ">
        <p className="text-xl">
          Total score:{"  "}
          <span className="font-semibold">{totalScore}&#47;50000</span>
        </p>
      </div>

      <div className="flex w-full justify-center gap-5 md:max-w-sm">
        <Link href={"/game"} className="w-full">
          <Button label={"New Game"} type={"button"} />
        </Link>
        <Link href={"/rankings"} className="w-full">
          <Button label={"View Ranking"} type={"button"} />
        </Link>
      </div>
    </div>
  );
};

export default Summary;
