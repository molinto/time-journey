"use client";

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
import Image from "next/image";
import TestImage from "../../public/test.jpg";

interface QuestionProps {}

const Question = () => {
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const dispatch = useAppDispatch();
  const [year, setYear] = useState(1963);
  const [userMarker, setUserMarker] = useState<Coordinates | null>(null);
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    // console.log(e.latLng?.toString());
    if (!e.latLng) return;
    setUserMarker({
      lat: e.latLng?.lat(),
      lng: e.latLng?.lng(),
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(event.currentTarget.value));
  };

  const kek = JSON.stringify(currentQuestion);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userMarker) return;

    const answer: Answer = {
      year: year,
      coordinates: userMarker,
      id: currentQuestion.id,
    };
    // console.log(currentQuestionNumber);
    dispatch(addAnswer(answer));
    setUserMarker(null);
    setYear(1963);
  };

  return (
    <div className="flex h-full w-full">
      <div className="relative -z-10 h-full w-full bg-amber-100 ">
        <Image
          src={TestImage}
          alt="Photo"
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="relative flex min-w-[432px] flex-col items-center justify-start gap-5 p-4">
        <Map userMarker={userMarker} handleMapClick={handleMapClick} />
        <Slider year={year} onChange={handleChange} />
        <Button
          type="button"
          label={userMarker ? "Submit!" : "Place a pin on the map!"}
          disabled={!userMarker}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Question;
