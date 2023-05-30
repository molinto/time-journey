"use client";

import { CldUploadWidget, CldUploadWidgetPropsOptions } from "next-cloudinary";
import Image from "next/image";
import PhotoIcon from "./icons/PhotoIcon";

const UPLOAD_PRESET = "zgrbsoin";

const options: CldUploadWidgetPropsOptions = {
  sources: ["url", "local"],
  maxImageFileSize: 5500000,
  clientAllowedFormats: ["image"],
  singleUploadAutoClose: false,
  theme: "minimal",
  showAdvancedOptions: false,
  cropping: false,
  multiple: false,
  defaultSource: "local",
  form: "#uploadForm",
  styles: {
    palette: {
      window: "#ffffff",
      sourceBg: "#f4f4f5",
      windowBorder: "#989592",
      tabIcon: "#000000",
      inactiveTabIcon: "#555a5f",
      menuIcons: "#555a5f",
      link: "#2546AF",
      action: "#339933",
      inProgress: "#3E62FB",
      complete: "#339933",
      error: "#cc0000",
      textDark: "#000000",
      textLight: "#fcfffd",
    },
    fonts: {
      default: null,
      "'Poppins', sans-serif": {
        url: "https://fonts.googleapis.com/css?family=Poppins",
        active: true,
      },
    },
  },
};

interface ImageUploadProps {
  imageUrl: string;
  handleUpload: (res: any) => void;
  error?: boolean;
}

const ImageUpload = ({ imageUrl, handleUpload, error }: ImageUploadProps) => {
  return (
    <CldUploadWidget
      uploadPreset={UPLOAD_PRESET}
      onUpload={handleUpload}
      options={options}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`relative
              flex
              h-full
              cursor-pointer
              flex-col 
              items-center 
              justify-center 
              gap-4
              border-2
              border-dashed
              bg-white
              p-12
              text-neutral-600
              transition
              hover:opacity-60
              ${error ? "border-brick-red" : "border-neutral-300"}
            `}
          >
            <PhotoIcon />
            <div className="text-lg font-semibold">Click to upload</div>
            {imageUrl ? (
              <div
                className="
              absolute inset-0 h-full w-full bg-gray-400"
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  src={imageUrl}
                  alt="Your photo"
                />
              </div>
            ) : null}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
