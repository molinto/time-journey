"use client";

import React from "react";
import ImageUpload from "../components/ImageUpload";
import Slider from "../components/Slider";
import GMap from "../components/GMap";
import Button from "../components/Button";
import useUploadForm from "../components/hooks/useUploadForm";
import TextareaInputGroup from "../components/TextareaInputGroup";
import TextInputGroup from "../components/TextInputGroup";

const Upload = () => {
  const {
    handleMapClick,
    handleSubmit,
    handleUpload,
    handleYearSlider,
    loading,
    handleDescriptionChange,
    year,
    description,
    license,
    marker,
    locationError,
    descriptionError,
    imageUrl,
    imageError,
    handleLicenseChange,
  } = useUploadForm();

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
                  <p className="absolute right-1 top-1 flex justify-center text-sm text-brick-red">
                    Please choose a photo!
                  </p>
                )}
              </div>
              <TextareaInputGroup
                label={"What is happening on this photo?"}
                onChange={handleDescriptionChange}
                error={descriptionError}
                value={description}
                errorMessage={"Please provide description!"}
              />
              <TextInputGroup
                label={"How is this photo licensed?"}
                handleLicenseChange={handleLicenseChange}
                value={license}
              />
              <div className="flex flex-col gap-2">
                <h3>What year the photo was taken?</h3>
                <Slider year={year} onChange={handleYearSlider} />
              </div>
            </div>
            <div className="flex h-full flex-col justify-between gap-5">
              <div className="flex  h-full flex-col gap-2">
                <div
                  className={`relative h-[75vh] w-full rounded lg:h-full
            
            ${locationError ? "border border-brick-red " : "border-transparent"}
            `}
                >
                  {locationError && (
                    <div className="absolute -top-6 right-1 text-sm text-brick-red">
                      Please point the place on the map!
                    </div>
                  )}
                  <GMap
                    handleMapClick={handleMapClick}
                    currentMarker={marker}
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
