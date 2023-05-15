"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import Slider from "../components/Slider";
import GMap from "../components/GMap";
import useResizeTextarea from "../components/hooks/useResizeTextarea";
import { Question } from "@prisma/client";
import axios from "axios";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

const Upload = () => {
  const [year, setYear] = useState(1963);
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState<Coordinates>();
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleYearSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.currentTarget.value));
  };

  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useResizeTextarea(descriptionRef.current, description);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setLocationError(false);
    setLocation({
      lat: e.latLng?.lat(),
      lng: e.latLng?.lng(),
    });
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescriptionError(e.target.value.length === 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!location) setLocationError(true);
    if (!imageUrl) setImageError(true);
    if (!description) setDescriptionError(true);

    const isValid = !locationError && !imageError && !descriptionError;

    if (!isValid) return;

    const data: Partial<Question> = {
      description: description,
      lat: location!.lat.toString(),
      lng: location!.lng.toString(),
      imageSrc: imageUrl,
      year: year,
      author: author,
    };

    const newQuestion = await axios.post("/api/newQuestion", data);

    router.push("/upload/success");

    setLoading(false);
  };

  const handleUpload = (res: any) => {
    if (!res?.info?.secure_url) return;
    setImageError(false);
    setImageUrl(res.info.secure_url);
  };

  return (
    <form
      action=""
      id="uploadForm"
      className="flex w-full flex-col items-center gap-8 px-6  py-8 md:h-full"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          Loading...
        </div>
      ) : (
        <>
          <div className="flex w-full grow flex-col gap-8 lg:grid lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className="relative flex h-full flex-col gap-1">
                <ImageUpload
                  handleUpload={handleUpload}
                  imageUrl={imageUrl}
                  error={imageError}
                />
                {imageError && (
                  <p className="absolute right-1 top-1 flex justify-center text-sm text-red-400">
                    Please choose a photo!
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="description">
                  What is happening on this photo?
                </label>
                <div className="relative flex flex-col gap-1">
                  <textarea
                    className={`w-full overflow-hidden  rounded-md border bg-white p-4 font-light  outline-none disabled:cursor-not-allowed disabled:opacity-70
          ${descriptionError ? "border-red-400" : "border-inherit"}
          `}
                    id="description"
                    ref={descriptionRef}
                    rows={1}
                    value={description}
                    onChange={onChange}
                  />
                  {descriptionError && (
                    <p className="absolute right-1 top-1  text-sm text-red-400">
                      Please provide description!
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="author">Who took this photo?</label>
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
              <div className="flex flex-col gap-2">
                <h3>What year the photo was taken?</h3>
                <Slider year={year} onChange={handleYearSlider} />
              </div>
            </div>
            <div className="flex h-full flex-col justify-between gap-5">
              <div className="flex  h-full flex-col gap-2">
                <div
                  className={`relative h-[75vh] w-full rounded lg:h-full
            
            ${locationError ? "border border-red-400 " : "border-transparent"}
            `}
                >
                  {locationError && (
                    <div className="absolute -top-6 right-1 text-sm text-red-400">
                      Please point the place on the map!
                    </div>
                  )}
                  {/* <div className="h-full w-full bg-green-300"></div> */}
                  <GMap
                    handleMapClick={handleMapClick}
                    currentMarker={location}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button label="Create question" type="submit" />
        </>
      )}
    </form>
  );
};

export default Upload;
