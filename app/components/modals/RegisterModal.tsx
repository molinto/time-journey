"use client";

import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "./ModalInput";
import useRegisterForm from "./useRegisterForm";
import { handleKeyDown } from "../utils/formUtils";
import Modal from "./Modal";
import OAuthButtons from "./OAuthButtons";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { open } from "./modalSlice";

const RegisterModal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthForm>();

  const { loading, submitRegisterForm } = useRegisterForm();
  const isOpen = useAppSelector((state) => state.modal.value === "register");
  const dispatch = useAppDispatch();

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <form
        onKeyDown={handleKeyDown}
        className="flex flex-col items-center gap-3"
        onSubmit={handleSubmit(submitRegisterForm)}
      >
        <Input
          type="text"
          id="name"
          disabled={loading}
          register={register}
          errors={errors}
        />
        <Input
          type="email"
          id="email"
          disabled={loading}
          register={register}
          errors={errors}
          pattern={{
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          }}
        />
        <Input
          type="password"
          id="password"
          disabled={loading}
          register={register}
          errors={errors}
        />
        <Button label="Register" type="submit" />
      </form>
      <hr className="border-silver" />
      <OAuthButtons />
    </div>
  );

  const footerContent = (
    <div className="flex items-center justify-between gap-3">
      <p>Already have an account?</p>
      <a
        className="underline transition duration-200 hover:text-dark-sky-light"
        href=""
        onClick={(e) => {
          e.preventDefault();

          dispatch(open("login"));
        }}
      >
        LogIn
      </a>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      title="Register"
      body={bodyContent}
      footer={footerContent}
      isOpen={isOpen}
    />
  );
};

export default RegisterModal;
