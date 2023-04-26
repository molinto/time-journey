"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import useLoginStore from "../hooks/useLoginStore";
import useRegisterStore from "../hooks/useRegisterStore";
import Modal from "./Modal";

export interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

const RegisterModal = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const registerModal = useRegisterStore();
  const loginModal = useLoginStore();

  const submitForm: SubmitHandler<IFormInputs> = (data: any) =>
    console.log(data);

  const bodyContent = (
    <form
      className="flex flex-col items-center gap-3 py-3"
      onSubmit={handleSubmit(submitForm)}
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
