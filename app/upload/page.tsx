"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import Slider from "../components/Slider";
import GMap from "../components/GMap";
import useResizeTextarea from "../components/hooks/useResizeTextarea";
import { Question } from "@prisma/client";
import axios from "axios";
import Button from "../components/Button";

const Upload = () => {
  const [year, setYear] = useState(1963);
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState<Coordinates>();
  const [imageSrc, setImageSrc] = useState("");
  const handleYearSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.currentTarget.value));
  };
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useResizeTextarea(descriptionRef.current, description);
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setLocation({
      lat: e.latLng?.lat(),
      lng: e.latLng?.lng(),
    });
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: Partial<Question> = {
      description: description,
      lat: location!.lat.toString(),
      lng: location!.lng.toString(),
      imageSrc: "kek",
      year: year,
      author: author,
    };

    const newQuestion = await axios
      .post("/api/newQuestion", data)
      .then((res) => console.log(res));
  };

  return (
    <form
      action=""
      id="uploadForm"
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <ImageUpload />
      <GMap handleMapClick={handleMapClick} currentMarker={location} />
      <div className="flex flex-col gap-2 ">
        <label htmlFor="description">What is happening on this photo?</label>
        <textarea
          className="w-full overflow-hidden rounded-md border bg-white p-4 font-light  outline-none disabled:cursor-not-allowed disabled:opacity-70"
          id="description"
          ref={descriptionRef}
          required
          rows={1}
          value={description}
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="author">
          Who took this picture? Or what is the source of this photo?
        </label>
        <input
          type="text"
          className="w-full overflow-hidden rounded-md border bg-white p-4 font-light  outline-none disabled:cursor-not-allowed disabled:opacity-70"
          id="author"
          value={author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAuthor(e.target.value)
          }
        />
      </div>
      <h3>What year the picture was taken?</h3>
      <Slider year={year} onChange={handleYearSlider} />
      <Button label="Create new Question!" type="submit" />
    </form>
  );
};

export default Upload;
