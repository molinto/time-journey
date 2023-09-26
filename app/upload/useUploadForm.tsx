import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { Question } from "@prisma/client";
import axios from "axios";
import { Coordinates } from "@/types";

const useUploadForm = () => {
  const [year, setYear] = useState(1963);
  const [description, setDescription] = useState("");
  const [license, setLicense] = useState("");
  const [marker, setMarker] = useState<Coordinates>();
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleYearSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.currentTarget.value));
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setLocationError(false);
    setMarker({
      lat: e.latLng?.lat(),
      lng: e.latLng?.lng(),
    });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescriptionError(e.target.value.length === 0);
  };

  const setErrors = () => {
    if (!marker) setLocationError(true);
    if (!imageUrl) setImageError(true);
    if (!description) setDescriptionError(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const isValid = marker && imageUrl && description;

    if (!isValid) {
      setErrors();
      setLoading(false);
      return;
    }

    const data: Partial<Question> = {
      description: description,
      lat: marker!.lat.toString(),
      lng: marker!.lng.toString(),
      imageSrc: imageUrl,
      year: year,
      license: license,
    };

    axios.post("/api/newQuestion", data);

    router.push("/upload/success");

    setLoading(false);
  };

  const handleUpload = (res: any) => {
    if (!res?.info?.secure_url) return;
    setImageError(false);
    setImageUrl(res.info.secure_url);
  };

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLicense(e.target.value);

  return {
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
  };
};

export default useUploadForm;
