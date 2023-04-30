"use client";

import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import useLoginStore from "../hooks/useLoginStore";
import useRegisterForm from "../hooks/useRegisterForm";
import useRegisterStore from "../hooks/useRegisterStore";
import { handleKeyDown } from "../utils/handleFormKeyPress";
import { IFormInputs } from "./LoginModal";
import Modal from "./Modal";
import OAuthButtons from "./OAuthButtons";

const RegisterModal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const registerModal = useRegisterStore();
  const loginModal = useLoginStore();

  const { loading, submitRegisterForm } = useRegisterForm();

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
      <hr />
      <OAuthButtons />
    </div>
  );

  const footerContent = (
    <div className="flex items-center gap-3">
      <p>Already have an account?</p>
      <a
        className="underline transition duration-200 hover:text-gray-400"
        href=""
        onClick={(e) => {
          e.preventDefault();

          registerModal.onClose();
          loginModal.onOpen();
        }}
      >
        LogIn
      </a>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={registerModal.isOpen}
      title="Register"
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
