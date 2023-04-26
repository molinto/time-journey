import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IFormInputs } from "./modals/LoginModal";

interface InputProps {
  id: "email" | "password" | "name";
  disabled?: boolean;
  type?: string;
  register: UseFormRegister<IFormInputs>;
  errors: FieldErrors;
  pattern?: {
    value: RegExp;
    message: string;
  };
}

const Input = ({
  id,
  disabled,
  type = "text",
  register,
  errors,
  pattern,
}: InputProps) => {
  const options = pattern
    ? { required: "This field is required", pattern }
    : { required: "This field is required" };
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, options)}
        className={`peer w-full rounded-md border bg-white p-4 pl-4 pt-6 font-light placeholder-transparent outline-none disabled:cursor-not-allowed disabled:opacity-70 
        ${
          errors[id]
            ? "focu:border-red-600 border-red-600"
            : "border-gray-300 focus:border-black"
        }`}
        placeholder=" "
      />
      {/* {errors?.firstName && <p>{errors?.email.message}</p>} */}
      <label
        className={`
        pointer-events-none absolute left-4 top-5 z-10 origin-[0] -translate-y-4 scale-75 transform  capitalize
        duration-150 peer-placeholder-shown:translate-y-0 
        peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:text-black
        ${errors[id] ? "text-rose" : "text-gray-400"}
        `}
      >
        {id}
      </label>
      {errors[id] && (
        <div className="py-1 text-sm text-red-600">
          {errors[id]?.message?.toString()}
        </div>
      )}
    </div>
  );
};

export default Input;
