
"use client";

import { useRouter } from "next/navigation";
import {
  addAnswer,
  selectCurrentQuestion,
  selectCurrentQuestionNumber,
} from "../game/gameSlice";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "./utils/reduxHooks";
import Slider from "./Slider";
import { ChangeEvent, useState } from "react";
import Map from "./GoogleMap";

interface QuestionProps {}

const Question = () => {
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const currentQuestionNumber = useAppSelector(selectCurrentQuestionNumber);
  const dispatch = useAppDispatch();
  console.log(currentQuestion, currentQuestionNumber);
  const [year, setYear] = useState(1963);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(event.currentTarget.value));
  };

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

      <Button type="button" label="Submit!" onClick={onClick} />
      <Slider year={year} onChange={handleChange} />
      <Map />
    </div>
  );
};

export default Question;
