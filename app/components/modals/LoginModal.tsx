"use client";

import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import useLoginForm from "../hooks/useLoginForm";
import useLoginStore from "../hooks/useLoginStore";
import useRegisterStore from "../hooks/useRegisterStore";
import { handleKeyDown } from "../utils/handleFormKeyPress";
import Modal from "./Modal";
import OAuthButtons from "./OAuthButtons";

export interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

const LoginModal = () => {
  const { loading, submitLoginForm } = useLoginForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const loginModal = useLoginStore();
  const registerModal = useRegisterStore();

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <form
        onKeyDown={handleKeyDown}
        className="flex flex-col items-center gap-3"
        onSubmit={handleSubmit(submitLoginForm)}
      >
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
        <Button label="Log in" type="submit" />
      </form>
      <hr />
      <OAuthButtons />
    </div>
  );

  const footerContent = (
    <div className="flex items-center justify-between">
      <p>Don't have an account yet?</p>
      <a
        href=""
        className="underline transition duration-200 hover:text-gray-400"
        onClick={(e) => {
          e.preventDefault();
          loginModal.onClose();
          registerModal.onOpen();
        }}
      >
        Register
      </a>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="Log in"
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default LoginModal;
