import Button from "@/app/components/Button";
import useResults from "@/app/components/hooks/useResults";
import { formatDistance } from "@/app/components/utils/gameUtils";
import Link from "next/link";

const Results = (answer: CompleteAnswer) => {
  const { currentQuestionNumber } = useResults();

  return (
    <div className="flex w-full grow flex-col justify-start gap-3 overflow-y-auto pr-1 lg:max-h-[25rem]">
      <h1 className=" text-lg font-semibold">{answer.gameYear}</h1>
      <p className="font-sm italic">{answer.license}</p>
      <div className="">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis hic
        totam error fugit ducimus nihil harum maxime aliquid ipsa modi corporis
        explicabo aliquam doloremque aut, corrupti, officiis laudantium!
        Officia, quis. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Repellat dignissimos in consequatur, quam culpa ab nisi laboriosam
        blanditiis nam reiciendis nemo harum magni iure ipsa illum laborum dicta
        non corrupti.
      </div>
      <div className="mt-auto flex flex-col gap-3">
        <div className="flex w-full items-center justify-between gap-3">
          <span>You were {answer.yearDifference} years off</span>
          <span className="font-semibold">{answer.yearScore}&#47;5000</span>
        </div>
        <div className="flex w-full items-center justify-between gap-3">
          <span className="">
            You were {formatDistance(answer.distance)} off
          </span>
          <span className="font-semibold">{answer.distanceScore}&#47;5000</span>
        </div>
        <div className="flex justify-between">
          <span className="">Total&#58;</span>
          <span className="font-semibold">
            {answer.distanceScore + answer.yearScore}&#47;10000
          </span>
        </div>
        <div className="py-2">
          {currentQuestionNumber < 4 ? (
            <Link
              className="flex w-full justify-center"
              href={`/game/question/${currentQuestionNumber + 2}`}
            >
              <Button type="button" label={"Next Question"} />
            </Link>
          ) : (
            <Link href={"/game/summary"} className="flex w-full justify-center">
              <Button type="button" label={"View Results"} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
