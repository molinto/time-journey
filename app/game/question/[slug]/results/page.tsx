"use client";

import Button from "@/app/components/Button";
import GMap from "@/app/components/GMap";
import useQuestionResults from "@/app/components/hooks/useQuestionResults";
import Image from "next/image";
import Link from "next/link";
const QuestionResults = () => {
  const { formattedDistance, markers, rightAnswer, currentQuestionNumber } =
    useQuestionResults();

  return (
    <div className="flex h-full w-full">
      <div className="relative -z-10 h-full w-full bg-amber-100 ">
        <Image
          src="/test.jpg"
          alt="Photo"
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="relative flex min-w-[432px] flex-col items-center justify-start gap-5 p-4">
        <div className="">{rightAnswer?.year}</div>
        <div className="">{formattedDistance}</div>
        <GMap finalMarkers={markers} />
        {currentQuestionNumber < 5 ? (
          <Link href={`/game/question/${currentQuestionNumber + 1}`}>
            <Button type="button" label={"Next Question"} />
          </Link>
        ) : (
          <Link href={"/game/summary"}>
            <Button type="button" label={"View Results"} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuestionResults;
