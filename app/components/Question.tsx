"use client";

import { useRouter } from "next/navigation";
import {
  addAnswer,
  selectCurrentQuestion,
  selectCurrentQuestionNumber,
} from "../game/gameSlice";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "./utils/reduxHooks";

interface QuestionProps {}

const Question = () => {
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const currentQuestionNumber = useAppSelector(selectCurrentQuestionNumber);
  const dispatch = useAppDispatch();
  console.log(currentQuestion, currentQuestionNumber);

  const kek = JSON.stringify(currentQuestion);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(currentQuestionNumber);
    dispatch(addAnswer(answer));
  };
  const answer: Answer = {
    year: 34,
    id: currentQuestion?.id || "",
    coordinates: {
      lat: "kek",
      lon: "shmek",
    },
  };
  return (
    <div className="">
      <div className="">{kek}</div>
      {/* <div className="">{currentQuestion.src}</div> */}

      <Button type="button" label="Submit!" onClick={onClick} />
    </div>
  );
};

export default Question;
