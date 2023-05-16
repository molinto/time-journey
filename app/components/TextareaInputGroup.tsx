import { useRef } from "react";
import useResizeTextarea from "./hooks/useResizeTextarea";

interface TextareaInputGroupProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: boolean;
  value: string;
  errorMessage: string;
}

const TextareaInputGroup = ({
  error,
  value,
  onChange,
  label,
  errorMessage,
}: TextareaInputGroupProps) => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useResizeTextarea(descriptionRef.current, value);

  return (
    <div className="flex flex-col gap-2 ">
      <label htmlFor="description">{label}</label>
      <div className="relative flex flex-col gap-1">
        <textarea
          className={`w-full overflow-hidden  rounded-md border bg-white p-4 font-light  outline-none disabled:cursor-not-allowed disabled:opacity-70
          ${error ? "border-red-400" : "border-inherit"}
          `}
          id="description"
          ref={descriptionRef}
          rows={1}
          value={value}
          onChange={onChange}
          maxLength={200}
        />
        {error && (
          <p className="absolute right-1 top-1  text-sm text-red-400">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextareaInputGroup;
