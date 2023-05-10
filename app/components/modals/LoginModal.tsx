"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "../Button";
import Input from "../Input";
import { handleKeyDown } from "../utils/handleFormKeyPress";
import Modal from "./Modal";
import OAuthButtons from "./OAuthButtons";
import { open, close } from "./modalSlice";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";

export interface IFormInputs {
  name?: string;
  email: string;
  password: string;
  customError: string;
}

const LoginModal = () => {
  const [loading, setLoading] = useState(false);

  const isOpen = useAppSelector((state) => state.modal.value === "login");
  const dispatch = useAppDispatch();

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          switch (res.error) {
            case "email":
              setError(
                res.error,
                { type: "custom", message: "User not found." },
                { shouldFocus: true }
              );
            case "password":
              setError(
                res.error,
                { type: "custom", message: "Incorrect password." },
                { shouldFocus: true }
              );
            default:
              setError(
                "root",
                { type: "custom", message: "Something went wrong." },
                { shouldFocus: true }
              );
          }
        } else {
          toast.success("Logged in");
          dispatch(close());
        }
      })
      .finally(() => setLoading(false));
  });

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <form
        onKeyDown={handleKeyDown}
        className="flex flex-col items-center gap-3"
        onSubmit={onSubmit}
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
      <p>Don:&apos;t have an account yet?</p>
      <a
        href=""
        className="underline transition duration-200 hover:text-gray-400"
        onClick={(e) => {
          e.preventDefault();
          dispatch(open("register"));
        }}
      >
        Register
      </a>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      title="Log in"
      body={bodyContent}
      footer={footerContent}
      isOpen={isOpen}
    />
  );
};
export default LoginModal;
