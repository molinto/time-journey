"use client";

import Button from "@/app/components/Button";
import GMap from "@/app/components/GMap";
import useQuestionResults from "@/app/components/hooks/useQuestionResults";
import { useAppSelector } from "@/app/components/utils/reduxHooks";
import { selectTotalScore } from "@/app/game/answersSlice";
import Image from "next/image";
import Link from "next/link";
const QuestionResults = () => {
  const totalScore = useAppSelector(selectTotalScore);

  const {
    gameLocation,
    gameYear,
    userLocation,
    formattedDistance,
    distanceScore,
    yearDifference,
    yearScore,
    currentQuestionNumber,
  } = useQuestionResults();

  return (
    <>
      <div className="flex flex-col items-start">
        <div className="flex gap-3">
          <h1>{gameYear}</h1>
          <h2>You were off {yearDifference} years.</h2>
        </div>
      </div>
      <h2>Score: {yearScore}&#47;5000</h2>
      <h2 className="">You were off {formattedDistance}.</h2>
      <h2>Distance Score: {distanceScore}&#47;5000</h2>
      <h2>
        Total: {totalScore} / {currentQuestionNumber * 10000}
      </h2>
      <div className="mt-auto aspect-square w-full">
        <GMap
          finalMarkers={{
            userMarker: userLocation,
            rightMarker: gameLocation,
          }}
        />
      </div>
      {currentQuestionNumber < 5 ? (
        <Link href={`/game/question/${currentQuestionNumber + 1}`}>
          <Button type="button" label={"Next Question"} />
        </Link>
      ) : (
        <Link href={"/game/summary"}>
          <Button type="button" label={"View Results"} />
        </Link>
      )}
    </>
  );
};

export default QuestionResults;
